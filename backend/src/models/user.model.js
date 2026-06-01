import { prisma } from "../db.js";

export async function createUser(user) {
  try {
    const data = await prisma.user.create({
      data: {
        uid: user.uid,
        name: user.name,
        email: user.email,
      },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getUserByUid(uid) {
  try {
    const data = await prisma.user.findUnique({
      where: { uid },
    });
    if (!data) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getUserByEmail(email) {
  try {
    const data = await prisma.user.findUnique({
      where: { email },
    });
    if (!data) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}