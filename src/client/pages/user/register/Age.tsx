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
import { loginUserAtom } from "../../../Atom";
import theme from "../../../theme/Color";

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
    required
      label="年齢(入力必須)"
      error={!!errors?.age}
      helperText={errors?.age?.message}
      type="number"
      variant="standard"
      defaultValue={loginUser?.age ?? ""}
      sx={{
        ".MuiFormLabel-asterisk": {
          color: theme.palette.error.main,
        },
      }}
      {...register("age", {
        required: "入力必須項目です",
        valueAsNumber: true,
        minLength: { value: 2, message: "2桁以内で入力してください" },
        maxLength: { value: 2, message: "2桁以内で入力してください" },
      })}
    />
  );
};
