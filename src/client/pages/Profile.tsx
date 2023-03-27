import axios from "axios";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import { IUser } from "../../models/UserDataSchema";
import { COLOR } from "../ColorTheme";

export const UserProfile: FC = () => {
  return <p>ユーザーのプロフィールページです</p>;
};
