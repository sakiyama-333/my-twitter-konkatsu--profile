import { VerifiedCallback } from "passport-jwt";
import { ProfileWithMetaData } from "@superfaceai/passport-twitter-oauth2";
import { UserModel } from "../../models/UserDataSchema";

export const twitterAuthHandler = async (
  accessToken: string,
  refreshToken: string,
  profile: ProfileWithMetaData,
  done: VerifiedCallback
) => {
  const currentUser = await UserModel.findOne({
    oauthProviderId: profile.id,
  });

  if (!currentUser) {
    const newUser = await UserModel.create({
      oauthProviderId: profile.id,
      name: profile.displayName,
      profilePhoto: profile.photos![0].value,
      source: "twitter",
    });
    return done(null, newUser);
  }
  return done(null, currentUser);
};
