import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  Container,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { styled, keyframes, css } from "@mui/system";
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

export const Profile: FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(true);
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
    console.log(successMessage, "😶");
    console.log(open, "😶");
    try {
      await axiosInstance.patch<IUser>(`/api/users`, payload);
      setSuccessMessage("更新が完了しました");
      setOpen(true); // 追加
      // router.push(`/profile`);
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
    <>
      {successMessage && ( // 追加
        <StyledSnackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={(event, reason) => {
            setSuccessMessage("");
            setOpen(false);
          }}
          role="alert"
        >
          <Alert variant="filled" severity="success">
            {successMessage}
          </Alert>
        </StyledSnackbar>
      )}
      {errorMessage && ( // 追加
        <StyledSnackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={(event, reason) => {
            setOpen(false);
          }}
          role="alert"
        >
          <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </StyledSnackbar>
      )}
      <Container maxWidth="md">
        <Paper elevation={3}>
          <form onSubmit={reactHookFormReturn.handleSubmit(onSubmit)}>
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
                </Typography>
                <Typography
                  sx={{ color: "#FF0000", fontSize: "12px", mt: "3px" }}
                >
                  ※基本情報は必須です。
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
                  #その他
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
    </>
  );
};

const StyledSnackbar = styled(Snackbar)(
  ({ theme }) => css`
    animation-name: ${snackbarInRight};
    animation-duration: 1.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  `
);
const snackbarInRight = keyframes`
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    
    `;
