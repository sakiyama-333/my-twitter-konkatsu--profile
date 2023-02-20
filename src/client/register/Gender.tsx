import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IUser } from "../../models/UserDataSchema";
import { FC } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const radioButtons = [
  { id: "male", label: "👨男", value: 1, required: true },
  { id: "female", label: "👩女", value: 2, required: false },
];

type Props = {
  register: UseFormRegister<IUser>;
  errors: FieldErrors<IUser>;
};

export const Gender: FC<Props> = ({ register, errors }) => {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">性別</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {radioButtons.map((radio) => {
            const { id, label, value, required } = radio;
            return (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio size="small" />}
                label={label}
                {...register("gender", { required: "選択してください" })}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      {errors.gender?.message && <div>{errors.gender.message}</div>}
    </div>
  );
};
