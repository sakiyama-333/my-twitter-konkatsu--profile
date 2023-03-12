import { FC } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { IUser } from "../../models/UserDataSchema";

const GENDER_ITEM = [
  { id: "male", label: "👨男", value: 1 },
  { id: "female", label: "👩女", value: 2 },
] as const;

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const Gender: FC<Props> = ({ reactHookFormReturn }) => {
  const { register, control } = reactHookFormReturn;

  return (
    <FormControl>
      <FormLabel>性別</FormLabel>
      <Controller
        control={control}
        name="gender"
        defaultValue={1}
        render={({ field, fieldState: { error } }) => (
          <>
            <RadioGroup>
              {GENDER_ITEM.map((radio) => (
                <FormControlLabel
                  {...field}
                  key={radio.value}
                  label={radio.label}
                  value={radio.value}
                  control={<Radio />}
                  {...register("gender", { required: "選択必須項目です" })}
                />
              ))}
            </RadioGroup>
            <FormHelperText error={!!error?.message} sx={{ ml: 0 }}>
              {error?.message}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

// MEMO：MUIの機能を使ってエラーの実装をしようとしたものの上手くいかなかったので、react-hook-formの機能を使って実装する
// ×：rules={{required: {value: true, message: '色は選択必須です'}}}
// 〇：{...register("gender", { required: "選択必須項目です" })}
