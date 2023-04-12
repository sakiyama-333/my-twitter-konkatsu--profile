import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleAuthHandler } from "./googleAuth.handler";
import { signJWTAndRedirectHandler } from "./signJWTAndRedirect.handler";

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    googleAuthHandler
  )
);

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    // prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  signJWTAndRedirectHandler
);

export default router;
