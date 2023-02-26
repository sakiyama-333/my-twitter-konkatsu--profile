import axios, { AxiosError } from "axios";
import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Button, ThemeProvider, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
// import styled from "@emotion/styled";
// import { styled } from "@mui/material/styles";

import { IUser } from "../../models/UserDataSchema";
import { Gender } from "./Gender";
import { Age } from "./Age";
import { Residence } from "./Residence";
import { Height } from "./Height";
import { COLOR } from "../ColorTheme";

const port = process.env.NEXT_PUBLIC_PORT;
const endPoint = `http://localhost:${port}/api/user`;

const SWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const SButton = styled(Button)({
  backgroundColor: COLOR.WHITE,
  border: `1px solid ${COLOR.DARK_GREEN}`,
  borderRadius: "0px",
  color: COLOR.DARK_GREEN,
  width: "100%",

  "&:hover": {
    backgroundColor: COLOR.ACCENT,
  },
});

export const SignUpPage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const getAllUser = async () => {
    try {
      const res = await axios.get<IUser[]>(endPoint);
      const users = res.data;
      if (!users) return;
      setUsers(users);
    } catch (err) {
      router.replace("/error"); //エラーが出た場合はエラーページに飛ばす
      console.log(`🍵ゲットエラー${err}`);
    }
  };
  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    reset();
    try {
      await axios.post<IUser[]>(endPoint, data);
      getAllUser();
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

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}
      <h2>NodejsとMongoDBで掲示板</h2>

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
      <div>
        <div>
          {users.map((user) => {
            return (
              <div key={user.name}>
                <h3>Name：{user.name}</h3>
                <p>Gender：{user.gender}</p>
                <p>Age：{user.age}</p>
                <p>Residence{user.residence}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
