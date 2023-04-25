import { Profile } from "passport";
import { IUser, UserModel } from "../../models/UserDataSchema";
import { VerifiedCallback } from "passport-jwt";

export const twitterAuthHandler = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifiedCallback
) => {
  const currentUser = await UserModel.findOne({
    oauthProviderId: profile.id,
  });

  if (!currentUser) {
    const newUser = await UserModel.create({
      oauthProviderId: profile.id,
      email: profile.emails![0].value,
      name: profile.displayName,
      profilePhoto: profile.photos![0].value,
      source: "google",
    });
    return done(null, newUser);
  }
  return done(null, currentUser);
};
