import { Schema, model, InferSchemaType } from "mongoose";

export type IUser = {
  _id: string;
  oauthProviderId: string;
  name: string;
  email: string;
  profilePhoto: String;
  gender: number;
  age: number;
  residence: string;
  height: number;
  source: "google" | "twitter";
  // figure: string;
  // academicHistory: string;
  // job: string;
  // holiday: string;
  // describeYourselfInOneWord: string;
  // favoriteType: string;
};

const UserSchema = new Schema<IUser>({
  oauthProviderId: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: { type: String, required: true },
  gender: {
    type: Number,
    required: false,
  },
  age: {
    type: Number,
    required: false,
    maxlength: 2,
  },
  residence: {
    type: String,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  source: {
    type: String,
    required: true,
  },
  // figure: {
  //   type: String,
  // },
  // academicHistory: {
  //   type: String,
  // },
  // job: {
  //   type: String,
  // },
  // holiday: {
  //   type: String,
  // },
  // describeYourselfInOneWord: {
  //   type: String,
  // },
  // favoriteType: {
  //   type: String,
  // },
});

// export type UserType = InferSchemaType<typeof UserSchema>;

export const UserModel = model<IUser>("User", UserSchema);
