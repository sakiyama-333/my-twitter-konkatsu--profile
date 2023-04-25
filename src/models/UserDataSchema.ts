import { Schema, model, InferSchemaType } from "mongoose";

export type IUser = {
  _id: string;
  oauthProviderId: string;
  name: string;
  email: string;
  profilePhoto: String;
  gender: number;
  age: number;
  residence: number;
  height: number;
  source: "google" | "twitter";
  selfExpression: {
    first: string;
    second: string;
    third: string;
  };
  // academicHistory: string;
  // job: string;
  // holiday: string;
  // describeYourselfInOneWord: string;
  // favoriteType: string;
};

const UserSchema = new Schema<IUser>({
  oauthProviderId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: false,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
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
    type: Number,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  selfExpression: {
    type: {
      first: { type: String },
      second: { type: String },
      third: { type: String },
    },
    required: false,
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
  source: {
    type: String,
    required: true,
  },
});

// export type UserType = InferSchemaType<typeof UserSchema>;

export const UserModel = model<IUser>("User", UserSchema);
