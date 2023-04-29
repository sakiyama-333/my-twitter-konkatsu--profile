import env from "dotenv";
env.config();

import express from "express";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./auth/route";
import session from "express-session";

import { IUser, UserModel } from "../models/UserDataSchema";
import { authenticateJWT } from "./auth/authenticateJWT.middleware";
import { validateRequestBodyByScheme } from "./validation/validationSchema";
import { IUserSchema } from "./../zod/IUserSchema";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://konnkatu.com",
      process.env.NGROK as string,
    ],
    credentials: true,
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

app.use(express.json());
app.use(express.static("pages"));
app.use(passport.initialize());
app.use(cookieParser());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRouter);

if (!process.env.MONGO_URI) throw new Error("あかん");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🐕😊");
  })
  .catch((err) => console.log(err));

app.get("/api/users", async (req, res) => {
  req.cookies;
  try {
    const allUserData = await UserModel.find();
    res.status(200).json(allUserData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});

app.patch(
  "/api/users",
  validateRequestBodyByScheme(IUserSchema),
  async (req, res, next) => {
    const body = req.body as IUser;
    const { _id } = req.body;
    try {
      const user = await UserModel.updateOne({ _id }, { $set: body });
      console.log({ user });
      res.status(200).json(user);
    } catch (err) {
      console.log(`😭${err}`);
      return next("情報の更新に失敗しました");
    }
  }
);

app.get("/api/profile", authenticateJWT, async (req, res) => {
  if (!req.user) {
    throw new Error("ユーザー情報がありません");
  }
  const { id } = req.user as JwtPayload;
  try {
    const userData = await UserModel.findOne({ oauthProviderId: id });
    res.status(200).json(userData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});

const PORT = new URL(process.env.NEXT_PUBLIC_API_URL!).port ?? 8080;
app.listen(PORT, () => {
  console.log(`💓Server start: http://localhost:${PORT}`);
});
