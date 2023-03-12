import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { TextField } from "@mui/material";

import { IUser } from "../../models/UserDataSchema";

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const Age: FC<Props> = ({ reactHookFormReturn }) => {
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
      variant="standard"
      {...register("age", {
        required: "入力必須項目です",
        minLength: { value: 2, message: "2桁以内で入力してください" },
        maxLength: { value: 2, message: "2桁以内で入力してください" },
      })}
    />
  );
};
