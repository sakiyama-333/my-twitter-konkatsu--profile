import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as TwitterStrategy } from "passport-twitter";
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
      callbackURL: process.env.TWITTER_CALLBACK_URL!,
      consumerKey: process.env.TWITTER_ACCESS_TOKEN!,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET!,
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
      scope: ["profile", "email"],
      session: false,
    })
  );

  router.get(
    "/twitter/callback",
    passport.authenticate("twitter", {
      failureRedirect: "/",
      session: false,
    }),
    //TODO: 確認↓
    signJWTAndRedirectHandler
  );
export default router;
