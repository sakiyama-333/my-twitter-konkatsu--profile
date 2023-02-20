import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IUser } from "../../models/UserDataSchema";
import { FC } from "react";

type Props = {
  register: UseFormRegister<IUser>;
  errors: FieldErrors<IUser>;
};

export const Name: FC<Props> = ({ register, errors }) => {
  return (
    <div>
      <label>
        名前
        <input
          type="text"
          placeholder="名前"
          {...register("name", {
            required: "入力が必須の項目です",
            maxLength: { value: 20, message: "20文字以内で入力してください" },
          })}
        />
        {errors.name?.message && <div>{errors.name.message}</div>}
      </label>
    </div>
  );
};
