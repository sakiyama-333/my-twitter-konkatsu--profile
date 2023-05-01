import { Schema, model, InferSchemaType, models, Model } from "mongoose";
import { string } from "zod";

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
  selfExpression: [string, string, string];

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
    type: [String, String, String],
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

// export const UserModel = model<IUser>("User", UserSchema);

interface UserModel extends Model<IUser> {}
export const UserModel = models.User
  ? (models.User as UserModel)
  : model<IUser, UserModel>("User", UserSchema);
