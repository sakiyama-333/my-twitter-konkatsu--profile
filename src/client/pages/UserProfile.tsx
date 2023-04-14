import axios, { AxiosError } from "axios";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IUser } from "../../models/UserDataSchema";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../theme/Color";
import { CustomButton } from "../CustomButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const UserProfile: FC = () => {
  const [userItems, setUserItems] = useState<IUser[]>([]);
  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await axios.get<IUser[]>(`${API_URL}/api/profile`, {
        withCredentials: true,
      });
      const user = res.data;
      console.log(`😎😎🙄${user}`);
      if (!user) {
        router.push("/");
        return;
      }
      setUserItems(user);
      console.log(userItems);
    } catch (err) {
      if (err instanceof AxiosError) {
        router.push("/");
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box maxWidth="lg" sx={{ textAlign: "right", pb: "16px" }}>
          <CustomButton label="プロフィールを登録" />
        </Box>
        <Paper elevation={3}>
          <Container maxWidth="xs">
            <Stack
              spacing={2}
              sx={{
                width: "90%",
                m: "0 auto",
                p: "48px 0",
              }}
            >
              <div>
                {userItems.map((item) => {
                  return (
                    <div key={item._id}>
                      <Box sx={{ display: "flex", gap: "16px" }}>
                        <Avatar
                          alt={item.name}
                          src={item.profilePhoto as string}
                          sx={{ width: 60, height: 60 }}
                        />
                        <p>{item.name}</p>
                      </Box>
                      <Box sx={{ mt: 5 }}>
                        <Typography
                          color={theme.palette.customDarkGreen.main}
                          // フォントをボールドに設定する
                          sx={{ mb: 2, fontWeight: 600 }}
                        >
                          #基本情報
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Box sx={{ color: "grey.600", minWidth: 100 }}>
                            性別
                          </Box>
                          <Box sx={{ color: "black" }}>{item.gender}</Box>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Box sx={{ color: "grey.600", minWidth: 100 }}>
                            年齢
                          </Box>
                          <Box sx={{ color: "black" }}>{item.age}</Box>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Box sx={{ color: "grey.600", minWidth: 100 }}>
                            居住地
                          </Box>
                          <Box sx={{ color: "black" }}>{item.residence}</Box>
                        </Box>
                      </Box>
                    </div>
                  );
                })}
              </div>
              <Box maxWidth="lg" sx={{ textAlign: "right" }}>
                <CustomButton label="SHERE" />
              </Box>
            </Stack>
          </Container>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
