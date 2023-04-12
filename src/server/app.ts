import env from "dotenv";
env.config();

import express from "express";
import  { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./auth/route";

import { IUser, UserModel } from "../models/UserDataSchema";
import { authenticateJWT } from "./auth/authenticateJWT.middleware";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://konnkatu.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("pages"));
app.use(passport.initialize());
app.use(cookieParser());

app.use("/auth", authRouter);

//TODO: Twitter認証のケースを追加する
// passport.use(
//   new TwitterStrategy(
//     {
//       callbackURL: process.env.GOOGLE_CALLBACK_URL!,
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     async (accessToken, refreshToken, profile: Profile, done) => {
//       const currentUser = await UserModel.findOne({
//         serviceProviderId: profile.id,
//       });
//     }
//   ),
// )

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

app.post("/api/users", async (req, res, next) => {
  const body = req.body as IUser;
  // TODO:18歳以下は登録できないのでエラーを吐くようにしたい
  try {
    const result = await UserModel.create(body);
    res.status(200).json(result);
  } catch (err) {
    console.log(`😭${err}`);
    return next("Userが作れませんでした");
  }
});

app.get("/api/profile", authenticateJWT, async (req, res) => {
  if (!req.user) {
    throw new Error("ユーザー情報がありません");
  }
  const { id } = req.user as JwtPayload;
  try {
    const userData = await UserModel.find({ oauthProviderId: id });
    res.status(200).json(userData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});

const PORT = new URL(process.env.NEXT_PUBLIC_API_URL!).port ?? 8080;
app.listen(PORT, () => {
  console.log(`💓Server start: http://localhost:${PORT}`);
});

