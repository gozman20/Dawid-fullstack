import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bycryptjs from "bcryptjs";

export const register = async (req: any, res: any) => {
  const { name, email, password } = await req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      refreshToken: "",
      password: await bycryptjs.hash(password, 8),
    },
  });
  res.json(user);
};
