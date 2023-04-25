import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { TextField } from "@mui/material";
import { IUser } from "../../../../models/UserDataSchema";

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const SelfExpression: FC<Props> = ({ reactHookFormReturn }) => {
  const {
    register,
    formState: { errors },
  } = reactHookFormReturn;

  return (
    <>
      <TextField
        label="自分を三言で表すと"
        error={!!errors?.selfExpression?.first}
        helperText={errors?.selfExpression?.first?.message}
        type="string"
        variant="standard"
        {...register("selfExpression.first", {
          required: "入力必須項目です",
          maxLength: { value: 20, message: "20文字以内で入力してください" },
        })}
      />

      <TextField
        label="自分を三言で表すと"
        error={!!errors?.selfExpression?.second}
        helperText={errors?.selfExpression?.second?.message}
        type="string"
        variant="standard"
        {...register("selfExpression.second", {
          required: "入力必須項目です",
          maxLength: { value: 20, message: "20文字以内で入力してください" },
        })}
      />

      <TextField
        label="自分を三言で表すと"
        error={!!errors?.selfExpression?.third}
        helperText={errors?.selfExpression?.third?.message}
        type="string"
        variant="standard"
        {...register("selfExpression.third", {
          required: "入力必須項目です",
          maxLength: { value: 20, message: "20文字以内で入力してください" },
        })}
      />
    </>
  );
};
