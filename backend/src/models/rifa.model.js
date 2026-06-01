import { prisma } from "../db.js";

export async function createRifa(rifa) {
  try {
    const data = await prisma.rifa.create({
      data: {
        title: rifa.title,
        description: rifa.description,
        totalTickets: rifa.totalTickets,
        prize: rifa.prize,
        startDate: rifa.startDate,
        endDate: rifa.endDate,
        userID: rifa.userId,
        ticketPrice: rifa.ticketPrice,
        organizer: rifa.organizer,
        totalTicketsSold: rifa.totalTicketsSold || 0,
        revenue: rifa.revenue || 0,
      },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getRifasUser(userID) {
  try {
    const data = await prisma.rifa.findMany({
      where: { userID },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getRifa(rifaId) {
  try {
    const data = await prisma.rifa.findUnique({
      where: { id: parseInt(rifaId) },
    });
    if (!data) {
      throw Object.assign(new Error("Rifa not found"), { status: 404 });
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateRifa(rifaId, fieldsToUpdate) {
  try {
    const data = await prisma.rifa.update({
      where: { id: parseInt(rifaId) },
      data: fieldsToUpdate,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteRifa(rifaId) {
  try {
    const data = await prisma.rifa.delete({
      where: { id: parseInt(rifaId) },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function decrementRifaTickets(rifaId, amount) {
  try {
    // Usamos $transaction para operación atómica: leer → validar → actualizar
    const result = await prisma.$transaction(async (tx) => {
      const rifa = await tx.rifa.findUnique({
        where: { id: parseInt(rifaId) },
      });

      if (!rifa) {
        throw Object.assign(new Error("Rifa not found"), { status: 404 });
      }

      if (rifa.totalTickets < amount) {
        throw new Error("No hay suficientes tickets disponibles");
      }

      const updated = await tx.rifa.update({
        where: { id: parseInt(rifaId) },
        data: {
          totalTickets: { decrement: amount },
          totalTicketsSold: { increment: amount },
          revenue: { increment: rifa.ticketPrice * amount },
        },
      });

      return updated;
    });

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateRifaStatus(rifaId, status) {
  try {
    const data = await prisma.rifa.update({
      where: { id: parseInt(rifaId) },
      data: { state: status },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function setRifaWinner(rifaId, userId, ticketId) {
  try {
    const data = await prisma.rifa.update({
      where: { id: parseInt(rifaId) },
      data: {
        winnerUserId: userId,
        winnerTicketId: parseInt(ticketId),
        drawDate: new Date(),
      },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function isRifaReadyForDraw(rifaId) {
  try {
    const rifa = await prisma.rifa.findUnique({
      where: { id: parseInt(rifaId) },
    });

    if (!rifa) {
      throw Object.assign(new Error("Rifa not found"), { status: 404 });
    }

    const hasNoWinner = !rifa.winnerUserId;
    const hasTicketsSold = rifa.totalTicketsSold > 0;

    return {
      data: {
        isReady: hasNoWinner && hasTicketsSold,
        rifa,
        reason: !hasTicketsSold ? "No hay tickets vendidos" : !hasNoWinner ? "Esta rifa ya tiene un ganador" : null,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

// Exportamos también un objeto con todas las funciones para facilitar las importaciones
export const rifaModel = {
  createRifa,
  getRifasUser,
  getRifa,
  updateRifa,
  deleteRifa,
  decrementRifaTickets,
  updateRifaStatus,
  setRifaWinner,
  isRifaReadyForDraw,
};