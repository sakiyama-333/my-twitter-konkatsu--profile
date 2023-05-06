import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { InputAdornment, TextField, styled } from "@mui/material";
import { IUser } from "../../../../models/UserDataSchema";
import { useAtom } from "jotai";
import { loginUserAtom } from "../../../Atom";
import theme from "../../../theme/Color";

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const Height: FC<Props> = ({ reactHookFormReturn }) => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const {
    register,
    formState: { errors },
  } = reactHookFormReturn;

  return (
    <TextField
      required
      label="身長(入力必須)"
      error={!!errors?.height}
      helperText={errors?.height?.message}
      type="number"
      variant="standard"
      defaultValue={loginUser?.height ?? ""}
      sx={{
        ".MuiFormLabel-asterisk": {
          color: theme.palette.error.main,
        },
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
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

// const STextField = styled(TextField)({
//   ".MuiFormLabel-asterisk": {
//     color: theme.palette.error.main,
//   },
// });
