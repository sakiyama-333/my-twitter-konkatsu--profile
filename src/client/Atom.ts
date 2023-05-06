import { atom } from "jotai";
import { IUser } from "../models/UserDataSchema";

export const loginUserAtom = atom<IUser | null>(null);

