import { AxiosError } from "axios";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import Link from "next/link";

import { IUser } from "../../../models/UserDataSchema";
import { Age } from "./register/Age";
import { Gender } from "./register/Gender";
import { Residence } from "./register/Residence";
import { Height } from "./register/Height";
import { SelfExpression } from "./register/SelfExpression";
import { axiosInstance } from "../../axiosInstance";
import { loginUserAtom } from "../../Atom";
import { PrimaryButton } from "../../CustomButton";
import theme from "../../theme/Color";
import { toast } from "react-toastify";

export const Profile: FC = () => {
  const router = useRouter();
  const reactHookFormReturn = useForm<IUser>();
  const [loginUser] = useAtom(loginUserAtom);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const payload = { ...data, _id: loginUser?._id };
    payload.gender = Number(payload.gender);
    payload.selfExpression = [
      payload.selfExpression[0],
      payload.selfExpression[1],
      payload.selfExpression[2],
    ];
    try {
      await axiosInstance.patch<IUser>(`/api/users`, payload);
      toast.success("更新が完了しました😊", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.info("エラーが発生しました🤨再度入力してください", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      toast.info("予期せぬエラーが発生しました🤨再度入力してください", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  if (!loginUser)
    return (
      <Box sx={{ textAlign: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box
          sx={{ width: "90%", display: "flex", justifyContent: "right", pt: 6 }}
        >
          <Link
            href={`/users/profile?id=${loginUser?.oauthProviderId}`}
            style={{ textDecoration: "none" }}
          >
            <PrimaryButton>プロフィールを確認する</PrimaryButton>
          </Link>
        </Box>
        <form onSubmit={reactHookFormReturn.handleSubmit(onSubmit)}>
          <Stack
            spacing={4}
            sx={{
              width: "90%",
              maxWidth: "480px",
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
            </Typography>
            <Box sx={{ display: "flex", gap: "16px" }}>
              <Avatar
                alt={loginUser?.name}
                src={loginUser?.profilePhoto as string}
                sx={{ width: 60, height: 60 }}
              />
              <p>{loginUser?.name}</p>
            </Box>
            <Gender reactHookFormReturn={reactHookFormReturn} />
            <Age reactHookFormReturn={reactHookFormReturn} />
            <Residence reactHookFormReturn={reactHookFormReturn} />
            <Height reactHookFormReturn={reactHookFormReturn} />
          </Stack>
          <Divider variant="middle" />

          <Stack
            spacing={4}
            sx={{
              width: "90%",
              maxWidth: "480px",
              m: "0 auto",
              p: "48px 0",
            }}
          >
            <Typography
              color={theme.palette.customDarkGreen.main}
              // TODO:フォントをボールドに設定する
              sx={{ fontWeight: 600 }}
            >
              #その他
            </Typography>
            <SelfExpression reactHookFormReturn={reactHookFormReturn} />
          </Stack>

          <Container maxWidth="lg" sx={{ textAlign: "center", pb: "48px" }}>
            <PrimaryButton type="submit" variant="contained">
              更新
            </PrimaryButton>
          </Container>
        </form>
      </Paper>
    </Container>
  );
};
