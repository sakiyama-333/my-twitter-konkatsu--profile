import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { TextField } from "@mui/material";
import { IUser } from "../../../../models/UserDataSchema";
import { useAtom } from "jotai";
import { loginUserAtom } from "../../../Atom";
import theme from "../../../theme/Color";

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const SelfExpression: FC<Props> = ({ reactHookFormReturn }) => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const {
    register,
    formState: { errors },
  } = reactHookFormReturn;

  return (
    <>
      <TextField
        required
        label="自分を三言で表すと(入力必須)"
        error={!!errors?.selfExpression?.[0]}
        helperText={errors?.selfExpression?.[0]?.message || ""}
        type="string"
        variant="standard"
        defaultValue={loginUser?.selfExpression[0] ?? ""}
        sx={{
          ".MuiFormLabel-asterisk": {
            color: theme.palette.error.main,
          },
        }}
        {...register("selfExpression.0", {
          required: "入力必須項目です",
          maxLength: { value: 20, message: "20文字以内で入力してください" },
        })}
      />

      <TextField
        required
        label="自分を三言で表すと(入力必須)"
        error={!!errors?.selfExpression?.[1]}
        helperText={errors?.selfExpression?.[1]?.message || ""}
        type="string"
        variant="standard"
        defaultValue={loginUser?.selfExpression[1] ?? ""}
        sx={{
          ".MuiFormLabel-asterisk": {
            color: theme.palette.error.main,
          },
        }}
        {...register("selfExpression.1", {
          required: "入力必須項目です",
          maxLength: { value: 20, message: "20文字以内で入力してください" },
        })}
      />

      <TextField
        required
        label="自分を三言で表すと(入力必須)"
        error={!!errors?.selfExpression?.[2]}
        helperText={errors?.selfExpression?.[2]?.message || ""}
        type="string"
        variant="standard"
        defaultValue={loginUser?.selfExpression[2] ?? ""}
        sx={{
          ".MuiFormLabel-asterisk": {
            color: theme.palette.error.main,
          },
        }}
        {...register("selfExpression.2", {
          required: "入力必須項目です",
          maxLength: { value: 20, message: "20文字以内で入力してください" },
        })}
      />
    </>
  );
};
