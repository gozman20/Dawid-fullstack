import { PrismaClient } from "@prisma/client";
import bycryptjs from "bcryptjs";
import { createToken } from "../src";

const prisma = new PrismaClient();

export const login = async (req: any, res: any) => {
  const { email, password } = await req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return res.json({ msg: "User not found" });

  const match = await bycryptjs.compare(password, user.password);

  if (!match) return res.json({ msg: "Password do not match" });

  // jwt.sign({ email: user.email, id: user.id }, jwtSecret, {
  //   expiresIn: "30m",
  // });

  const generatedToken = createToken(user.email, user.id, user.name);
  const update = await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: generatedToken },
  });

  res.cookie("refresh_token", generatedToken, {
    httpOnly: true,
    // sameSite: "none",   //dont-include this in development as it blocks cookies from being set to the browser
    // secure: true,
    // maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generatedToken,
  });
};
