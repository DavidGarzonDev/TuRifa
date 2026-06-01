import { prisma } from "../db.js";

export async function createTicket(ticket) {
  try {
    const data = await prisma.ticket.create({
      data: {
        idRifa: ticket.rifaId,
        idUser: ticket.userId,
        buyDate: ticket.buyDate,
        expireDate: ticket.expireDate,
        state: ticket.status,
        idPago: ticket.idPago,
        price: ticket.price,
        methodPago: ticket.methodPago,
      },
    });

    // Generar numero_boleto desde el ID si no existe
    const numeroBoleto = `#${String(data.id).padStart(4, "0")}`;

    return { data: { ...data, numeroBoleto }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getTicketsByRifaId(rifaId) {
  try {
    const data = await prisma.ticket.findMany({
      where: { idRifa: parseInt(rifaId) },
    });

    // Procesar número de boleto si no existe
    const processedData = data.map((ticket) => {
      if (!ticket.numeroBoleto) {
        ticket.numeroBoleto = `#${String(ticket.id).padStart(4, "0")}`;
      }
      return ticket;
    });

    return { data: processedData, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getAllTicketsModel(userId) {
  try {
    const data = await prisma.ticket.findMany({
      where: { idUser: userId },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getTicketById(ticketId) {
  try {
    const data = await prisma.ticket.findUnique({
      where: { id: parseInt(ticketId) },
    });

    if (!data) {
      throw Object.assign(new Error("Ticket not found"), { status: 404 });
    }

    // Procesar número de boleto si no existe
    if (data && !data.numeroBoleto) {
      data.numeroBoleto = `#${String(data.id).padStart(4, "0")}`;
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Exportamos las funciones en un objeto
export const ticketModel = {
  createTicket,
  getTicketsByRifaId,
  getAllTicketsModel,
  getTicketById,
};