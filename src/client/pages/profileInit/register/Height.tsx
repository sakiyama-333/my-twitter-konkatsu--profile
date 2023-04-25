import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { InputAdornment, TextField } from "@mui/material";
import { IUser } from "../../../../models/UserDataSchema";

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const Height: FC<Props> = ({ reactHookFormReturn }) => {
  const {
    register,
    formState: { errors },
  } = reactHookFormReturn;

  return (
    <TextField
      label="身長"
      error={!!errors?.height}
      helperText={errors?.height?.message}
      type="number"
      variant="standard"
      InputProps={{
        startAdornment: <InputAdornment position="end">cm</InputAdornment>,
      }}
      {...register("height", {
        required: "入力必須項目です",
        valueAsNumber: true,
        minLength: { value: 3, message: "3桁以内で入力してください" },
        maxLength: { value: 3, message: "3桁以内で入力してください" },
      })}
    />
  );
};
