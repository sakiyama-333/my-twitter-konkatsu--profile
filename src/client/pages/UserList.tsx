import { FC } from "react";
import { useRouter } from "next/router";

import { IUser } from "../../models/UserDataSchema";
import {
  Avatar,
  Box,
  Card,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import theme from "../theme/Color";
import { RESIDENCE } from "./user/register/Residence";
import { GENDER_ITEM } from "./user/register/Gender";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  users: IUser[];
};

export const UserList: FC<Props> = ({ users }) => {
  const router = useRouter();

  if (!users.length) return null;
  return (
    <Container maxWidth="md">
      <h2>ユーザー一覧</h2>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {users.map((user) => {
          const prefName = RESIDENCE.find(
            (pref) => user?.residence === pref.code
          )?.name;

          const genderLabel = GENDER_ITEM.find(
            (gender) => user?.gender === gender.value
          )?.label;
          return (
            <Grid xs={4} sm={4} md={4} key={user._id}>
              <Link
                href={`/users/profile?id=${user?.oauthProviderId}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    p: 2,
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease-out",
                    height: "100%",
                  }}
                >
                  <Box>
                    <Box sx={{ display: "flex", gap: "16px" }}>
                      <Avatar
                        alt={user?.name}
                        src={user?.profilePhoto as string}
                        sx={{ width: 60, height: 60 }}
                      />
                      <p>{user?.name}</p>
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
                        <Box sx={{ color: "black" }}>{user?.age}</Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          mb: 2,
                        }}
                      >
                        <Box sx={{ color: "grey.600" }}>居住地</Box>
                        <Box sx={{ color: "black" }}>{prefName}</Box>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
