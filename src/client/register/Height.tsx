import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IUser } from "../../models/UserDataSchema";
import { FC } from "react";
import { TextField } from "@mui/material";

type Props = {
  register: UseFormRegister<IUser>;
  errors: FieldErrors<IUser>;
};

export const Height: FC<Props> = ({ register, errors }) => {
  return (
    <div>
      <TextField
        id="standard-basic"
        label="身長"
        variant="standard"
        placeholder="例: 160"
        {...register("height", {
          required: "入力が必須の項目です",
          minLength: { value: 3, message: "3桁以内で入力してください" },
          maxLength: { value: 3, message: "3桁以内で入力してください" },
        })}
      />
      {errors.height?.message && <div>{errors.height.message}</div>}
    </div>
  );
};
