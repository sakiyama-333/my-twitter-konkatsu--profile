import axios, { AxiosError } from "axios";
import { FC, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { IUser } from "../../models/UserDataSchema";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../theme/Color";
import { PrimaryButton } from "../CustomButton";
import loginUserAtom from "../Atom";
import { useAtom } from "jotai";
import { axiosInstance } from "../axiosInstance";
import { RESIDENCE } from "./profileInit/register/Residence";
import { GENDER_ITEM } from "./profileInit/register/Gender";

export const Profile: FC = () => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const router = useRouter();

  useLayoutEffect(() => {
    if(!loginUser?.age) router.push("/profile-init")
  }, [loginUser]);

  const prefName = RESIDENCE.find(
    (pref) => loginUser?.residence === pref.code
  )?.name;
  
  const genderLabel = GENDER_ITEM.find(
    (gender) => loginUser?.gender === gender.value
  )?.label;

  const handleEditProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/profile-init",
      query: {
        _id: loginUser?._id,
        name: loginUser?.name,
      },
    });
  };

  if (!loginUser?.age) return <CircularProgress />;
  //TODO: react loading libraryで良い感じのやつを表示する
  return (
      <Container maxWidth="md">
        <Box maxWidth="lg" sx={{ textAlign: "right", pb: "16px" }}>
          <PrimaryButton
            type="submit"
            variant="contained"
            onClick={handleEditProfile}
          >
            プロフィールを編集
          </PrimaryButton>
        </Box>
        <Paper elevation={3}>
          <Container maxWidth="xs">
            <Stack
              spacing={2}
              sx={{
                // width: "90%",
                m: "0 auto",
                p: "48px 0",
              }}
            >
              <div>
                <div>
                  <Box sx={{ display: "flex", gap: "16px" }}>
                    <Avatar
                      alt={loginUser?.name}
                      src={loginUser?.profilePhoto as string}
                      sx={{ width: 60, height: 60 }}
                    />
                    <p>{loginUser?.name}</p>
                  </Box>
                  <Box sx={{ mt: 5 }}>
                    <Typography
                      color={theme.palette.customDarkGreen.main}
                      // TODO:フォントをボールドに設定する
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      #基本情報
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: "grey.600" }}>性別</Box>
                      <Box sx={{ color: "black" }}>{genderLabel}</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: "grey.600" }}>年齢</Box>
                      <Box sx={{ color: "black" }}>{loginUser?.age}</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: "grey.600" }}>
                        居住地
                      </Box>
                      <Box sx={{ color: "black" }}>{prefName}</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ color: "grey.600", maxWidth: 100 }}
                      >
                        自分を三言で表すと
                      </Box>
                      <Box sx={{ color: "black" }}>
                        {loginUser?.selfExpression?.first}
                      </Box>
                      <Box sx={{ color: "black" }}>
                        {loginUser?.selfExpression?.second}
                      </Box>
                      <Box sx={{ color: "black" }}>
                        {loginUser?.selfExpression?.third}
                      </Box>
                    </Box>
                  </Box>
                </div>
              </div>
              <Box maxWidth="lg" sx={{ textAlign: "right" }}>
                <PrimaryButton type="submit" variant="contained">
                  SHERE
                </PrimaryButton>
              </Box>
            </Stack>
          </Container>
        </Paper>
      </Container>
  );
};
