import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IUser } from "../../models/UserDataSchema";
import { FC } from "react";
import { TextField } from "@mui/material";

type Props = {
  register: UseFormRegister<IUser>;
  // なんでここにIUserが入るのかわからない！！
  errors: FieldErrors<IUser>;
};

export const Age: FC<Props> = ({ register, errors }) => {
  return (
    <div>
      <TextField
        id="standard-basic"
        label="年齢"
        variant="standard"
        {...register("age", {
          required: "入力が必須の項目です",
          minLength: { value: 2, message: "2桁以内で入力してください" },
          maxLength: { value: 2, message: "2桁以内で入力してください" },
        })}
      />
      {errors.age?.message && <div>{errors.age.message}</div>}
    </div>
  );
};
