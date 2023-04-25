import { atom } from "jotai";
import { IUser } from "../models/UserDataSchema";

const loginUserAtom = atom<IUser | null>(null);

export default loginUserAtom;
