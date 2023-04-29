import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as TwitterStrategy } from "@superfaceai/passport-twitter-oauth2";
import { googleAuthHandler } from "./googleAuth.handler";
import { signJWTAndRedirectHandler } from "./signJWTAndRedirect.handler";
import { twitterAuthHandler } from "./twitterAuth.handler";

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

passport.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      clientType: "confidential",
      callbackURL: process.env.TWITTER_CALLBACK_URL!,
    },
    twitterAuthHandler
  )
);

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
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

router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["tweet.read", "users.read", "offline.access"],
  })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/",
  }),
  signJWTAndRedirectHandler
);
export default router;
