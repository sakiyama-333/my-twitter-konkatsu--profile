import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Box,
  Chip,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import { IUser } from "../../../../models/UserDataSchema";
import { useAtom } from "jotai";
import loginUserAtom from "../../../Atom";

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const Age: FC<Props> = ({ reactHookFormReturn }) => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);


  const {
    register,
    formState: { errors },
  } = reactHookFormReturn;

  return (
    <TextField
      label="年齢"
      error={!!errors?.age}
      helperText={errors?.age?.message}
      type="number"
      variant="outlined"
      defaultValue={loginUser!.age ? loginUser!.age : ""}
      sx={{ width: "100%" }}
      {...register("age", {
        required: "入力必須項目です",
        valueAsNumber: true,
        minLength: { value: 2, message: "2桁以内で入力してください" },
        maxLength: { value: 2, message: "2桁以内で入力してください" },
      })}
    />
  );
};
