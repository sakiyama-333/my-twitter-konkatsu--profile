import { RequestHandler } from "express";
import jsonWebToken from "jsonwebtoken";

export const authenticateJWT: RequestHandler = (req, res, next) => {
  const token = req.cookies.token as string;
  if (!token) return res.sendStatus(401);

  jsonWebToken.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
