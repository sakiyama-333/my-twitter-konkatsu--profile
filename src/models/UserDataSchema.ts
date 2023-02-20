import { Schema, model, InferSchemaType } from "mongoose";

export type IUser = {
  name: string;
  gender: number;
  age: number;
  residence: string;
  height: number;
  // figure: string;
  // academicHistory: string;
  // job: string;
  // holiday: string;
  // describeYourselfInOneWord: string;
  // favoriteType: string;
};

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  gender: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    maxlength: 2,
  },
  residence: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
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

export const User = model<IUser>("User", UserSchema);

type aaa = typeof UserSchema