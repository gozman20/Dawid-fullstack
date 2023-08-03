import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { uploadPhoto } from "../controllers/upload";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { upload } from "../middleware/uploadImage";
import {
  getAllPlaces,
  getOwnwersPlaces,
  getPlaceById,
  places,
} from "../controllers/places";
import { profile } from "../controllers/profile";
import { register } from "../controllers/register";
import { login } from "../controllers/login";
import { corsOption } from "../libs/cors";
dotenv.config();

const jwtSecret = "chigoziedddd";

export const createToken = (email: string, id: number, name: string) => {
  return jwt.sign({ email: email, id: id, name: name }, jwtSecret, {
    // expiresIn: "60mins",
  });
};
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
//path to where the image will be stored
app.use("../../../frontend/public", express.static("../../../frontend/public"));
app.use(cors(corsOption));

app.post("/register", register);
app.post("/login", login);
app.post("/logout", (req, res) => {
  // res.clearCookie();
  res.json();
});
app.post("/upload", upload.array("picture", 10), uploadPhoto);
app.post("/places", places);
app.get("/place/:id", getPlaceById);
app.get("/profile", profile);
app.get("/allplaces", getAllPlaces);
app.get("/places", getOwnwersPlaces);

app.listen(3001);
