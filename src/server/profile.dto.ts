import { IUser, UserModel } from "../models/UserDataSchema";

//TODO:email確認
export type ProfileDto = Omit<
  IUser,
  "oauthProviderId" | "_id" | "source" | "email"
>;

export function IUserToProfileDto(user: IUser): ProfileDto {
  const { age, gender, height, name, profilePhoto, residence, selfExpression } =
    user;

  const filteredEntries = Object.entries({
    age,
    gender,
    height,
    name,
    profilePhoto,
    residence,
    selfExpression,
  }).filter(([key, value]) => value !== undefined);

  return Object.fromEntries(filteredEntries) as ProfileDto;
}

// export function IUserToProfileDto(user: IUser): ProfileDto {
//   const { age, gender, height, name, profilePhoto, residence, selfExpression } =
//     user;
//   return {
//     age,
//     gender,
//     height,
//     name,
//     profilePhoto,
//     residence,
//     selfExpression,
//   };
// }
