import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, Request } from "express";
dotenv.config();
const jwtSecret = "chigoziedddd";
const prisma = new PrismaClient();

export const places = async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  if (refresh_token) {
    jwt.verify(refresh_token, jwtSecret, {}, (err, user) => {
      if (err) throw new Error();
      res.json(user);
    });
  } else {
    return null;
  }

  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    maxGuest,
    price,
    userId,
  } = req.body;

  const place = await prisma.listing.create({
    data: {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuest: parseInt(maxGuest, 10),
      price: parseInt(price, 10),
      userId,
    },
  });
  res.json(place);
};

export const getPlaceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const place = await prisma.listing.findUnique({
    where: { id: +id },
  });
  res.json(place);
};

export const getOwnwersPlaces = async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  console.log(req.cookies);
  if (refresh_token) {
    jwt.verify(refresh_token, jwtSecret, {}, async (err, user: any) => {
      if (err) throw new Error();
      const places = await prisma.listing.findMany({
        where: { userId: user.id },
      });
      console.log(places);
      if (!places) return null;
      res.json(places);
    });
  } else {
    return null;
  }
};

export const getAllPlaces = async (_req: Request, res: Response) => {
  const places = await prisma.listing.findMany();
  res.json(places);
};
