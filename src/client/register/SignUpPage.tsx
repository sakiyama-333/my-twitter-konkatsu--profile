import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { IUser } from "../../models/UserDataSchema";
import { Gender } from "./Gender";
import { Age } from "./Age";
import { Residence } from "./Residence";
import { Height } from "./Height";
import { COLOR } from "../ColorTheme";

const port = process.env.NEXT_PUBLIC_PORT;
const endPoint = `http://localhost:${port}/api/user`;

export const SignUpPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    reset();
    try {
      await axios.post<IUser[]>(endPoint, data);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setErrorMessage("構文エラーが出ました");
        return;
      }
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data);
        return;
      }
      setErrorMessage("予期せぬエラー");
    }
  };

  return (
    <div>
      <SWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <Gender register={register} errors={errors} />
          <br />
          <Age register={register} errors={errors} />
          <br />
          <Residence register={register} />
          <br />
          <Height register={register} errors={errors} />
          <br />
          <SButton variant="contained">登録</SButton>
        </form>
      </SWrap>
    </div>
  );
};

const SWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const SButton = styled(Button)({
  width: "100%",
  border: `1px solid ${COLOR.DARK_GREEN}`,
  borderRadius: "0px",
  backgroundColor: COLOR.WHITE,
  color: COLOR.DARK_GREEN,

  "&:hover": {
    backgroundColor: COLOR.ACCENT,
  },
});
