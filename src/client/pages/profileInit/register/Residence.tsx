import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { IUser } from "../../../../models/UserDataSchema";


export const RESIDENCE = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
] as const;

type Props = {
  reactHookFormReturn: UseFormReturn<IUser, any>;
};

export const Residence: FC<Props> = ({ reactHookFormReturn }) => {
  const { register, control } = reactHookFormReturn;

  return (
    <Controller
      control={control}
      name="residence"
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            select
            fullWidth
            label="居住地"
            error={!!error?.message}
            helperText={error?.message}
            variant="standard"
          >
            {RESIDENCE.map((residence) => (
              <MenuItem
                key={residence}
                value={residence}
                {...register("residence", { required: "選択必須項目です" })}
              >
                {residence}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    />
  );
};
