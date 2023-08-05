import { Response, Request } from "express";
import jwt from "jsonwebtoken";
const jwtSecret = "chigoziedddd";

export const profile = async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  if (refresh_token) {
    jwt.verify(refresh_token, jwtSecret, {}, (err, user) => {
      if (err) throw new Error();
      res.json(user);
    });
  } else {
    return null;
  }
};
