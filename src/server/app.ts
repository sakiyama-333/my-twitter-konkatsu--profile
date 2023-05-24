import env from "dotenv";
env.config();

import express from "express";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./auth/route";
import session from "express-session";

import { IUser, UserModel } from "../models/UserDataSchema";
import { authenticateJWT } from "./auth/authenticateJWT.middleware";
import { validateRequestBodyByScheme } from "./validation/validationSchema";
import { IUserSchema } from "./../zod/IUserSchema";
import connectMongo from "./mongooseConnect";
import { SearchUser } from "../client/pages/Search";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://twikon.omu-omu.com",
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
  //TODO: secretを変更
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRouter);

if (!process.env.MONGO_URI) throw new Error("あかん");
console.log("process.env.MONGO_URI: ", process.env.MONGO_URI);
console.log("process.env.MONGO_URI type: ", typeof process.env.MONGO_URI);

connectMongo();

//全てのユーザーを取得
app.get("/api/users", async (req, res) => {
  try {
    const allUserData = await UserModel.find();
    res.status(200).json(allUserData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});

//ユーザー情報を更新
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

// MEMO:この記述は自分のプロフィールページを見た時の記述
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

app.delete("/api/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("ログアウトしました");
  } catch (err) {
    res.status(500).send("ログアウトに失敗しました");
  }
});

app.delete("/api/withdrawal", async (req, res) => {
  console.log(req.body.id, "🐾🐾");
  const id = req.body.id;
  try {
    await UserModel.deleteOne({ _id: id });
    res.status(200).send("退会しました");
  } catch (err) {
    res.status(500).send("アカウント削除に失敗しました");
  }
});

// Renderのスリープ対策
app.get("/api/render", async (req, res) => {
  res.status(200).send("通信成功");
});

app.get("/api/users/profile", async (req, res) => {
  if (!req.query) {
    throw new Error("IDが見つかりません");
  }
  try {
    const userData = await UserModel.findOne({ oauthProviderId: req.query.id });
    res.status(200).json(userData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});

app.post("/api/users/search", async (req, res) => {
  const body = req.body as SearchUser;
  try {
    const userData = await UserModel.find({
      age: { $gte: body.fromAge, $lt: body.toAge },
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(`🧹${err}`);
  }
});

const PORT = process.env.PORT;
if (!PORT) throw new Error("envファイルが読み込めていません");
app.listen(PORT, () => {
  console.log(`💓Server start: http://localhost:${PORT}`);
});
