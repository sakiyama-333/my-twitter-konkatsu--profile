import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";

import { IUser } from "../../../models/UserDataSchema";
import { Age } from "./register/Age";
import { Gender } from "./register/Gender";
import { Residence } from "./register/Residence";
import { Height } from "./register/Height";
import { SelfExpression } from "./register/SelfExpression";
import { axiosInstance } from "../../axiosInstance";
import loginUserAtom from "../../Atom";
import { PrimaryButton } from "../../CustomButton";
import theme from "../../theme/Color";

const port = process.env.NEXT_PUBLIC_PORT;
const endPoint = `http://localhost:${port}/api/user`;

export const ProfileInit: FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const reactHookFormReturn = useForm<IUser>();
  const [loginUser] = useAtom(loginUserAtom);
  

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const payload = { ...data, _id: loginUser?._id };
    payload.gender = Number(payload.gender);

    console.log(payload);

    try {
      await axiosInstance.patch<IUser>(`/api/users`, payload);
      router.push(`/profile`);
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
    <Container maxWidth="md">
      <Paper elevation={3}>
        <form
          onSubmit={reactHookFormReturn.handleSubmit(onSubmit)}
        >
          <Container maxWidth="xs">
            <Stack
              spacing={2}
              sx={{
                width: "90%",
                m: "0 auto",
                p: "48px 0",
              }}
            >
              <Typography
                color={theme.palette.customDarkGreen.main}
                // TODO:フォントをボールドに設定する
                sx={{ fontWeight: 600 }}
              >
                #基本情報
                <Typography
                  sx={{ color: "#FF0000", fontSize: "12px", mt: "3px" }}
                >
                  ※基本情報は必須です。
                </Typography>
              </Typography>
              <Gender reactHookFormReturn={reactHookFormReturn} />
              <Age reactHookFormReturn={reactHookFormReturn} />
              <Residence reactHookFormReturn={reactHookFormReturn} />
              <Height reactHookFormReturn={reactHookFormReturn} />

              <Typography
                color={theme.palette.customDarkGreen.main}
                // TODO:フォントをボールドに設定する
                sx={{ fontWeight: 600, pt: 6 }}
              >
                #基本情報
              </Typography>
              <SelfExpression reactHookFormReturn={reactHookFormReturn} />
            </Stack>
          </Container>
          <Container maxWidth="lg" sx={{ textAlign: "center", pb: "48px" }}>
            <PrimaryButton type="submit" variant="contained">
              登録
            </PrimaryButton>
          </Container>
        </form>
      </Paper>
    </Container>
  );
};
