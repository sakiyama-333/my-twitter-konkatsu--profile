import express, { NextFunction, Response, Request } from "express";
import env from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/UserDataSchema";

env.config();
const app = express();
const port = process.env.NEXT_PUBLIC_PORT ?? 8080;
const db = mongoose.connection;

app.use(express.json());

app.use(express.static("pages"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

if (!process.env.MONGO_URI) throw new Error("あかん");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🐕😊");
  })
  .catch((err) => console.log(err));

app.post("/api/login", async (req, res, next) => {
  try {
    const generateToken = (user: IUser): string => {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT secret is not defined");
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1d" });
      return token;
    };
  } catch (err) {
    console.log(`😭${err}`);
    return next("Userが作れませんでした");
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    const userData = await User.findById(req.query._id);
    console.log(userData);
    res.status(200).json(userData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});
app.get("/api/user", async (req, res) => {
  try {
    const allUserData = await User.find();
    res.status(200).json(allUserData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});

app.post("/api/user", async (req, res, next) => {
  const body = req.body as IUser;
  // TODO:18歳以下は登録できないのでエラーを吐くようにしたい
  try {
    const result = await User.create(body);
    res.status(200).json(result);
  } catch (err) {
    console.log(`😭${err}`);
    return next("Userが作れませんでした");
  }
});

app.use(function (req, res) {
  res.status(404).send("Page Not Found");
});

app.use(function (
  errMessage: string,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (errMessage) {
    case "Userが作れませんでした":
      return res.status(500).json(errMessage);
      break;
  }
  // res.status(500).json({ msg: err.message });
});

app.listen(port, () => {
  console.log(`💓Server start: http://localhost:${port}`);
});
