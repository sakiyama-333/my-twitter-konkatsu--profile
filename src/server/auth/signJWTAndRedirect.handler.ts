import env from "dotenv";
env.config();

import { RequestHandler } from "express";
import jsonWebToken from "jsonwebtoken";
import { IUser } from "../../models/UserDataSchema";

export const signJWTAndRedirectHandler: RequestHandler = (req, res, next) => {
  const user = req.user as IUser;
  if (!user) {
    return next(new Error("認証されてません"));
  }

  const jwt = jsonWebToken.sign(
    { id: user.oauthProviderId },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  req.session.destroy((err) => {
    res.cookie("token", jwt, { maxAge: 86400 * 1000, httpOnly: true });
    res.redirect(`${process.env.NEXT_PUBLIC_API_URL}/profile`);
  });
};
