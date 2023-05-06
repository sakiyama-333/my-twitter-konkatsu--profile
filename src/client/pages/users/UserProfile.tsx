import { FC } from "react";
import {
  Avatar,
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import theme from "../../theme/Color";
import { RESIDENCE } from "../user/register/Residence";
import { GENDER_ITEM } from "../user/register/Gender";
import { ProfileDto } from "../../../server/profile.dto";

export const UserProfile: FC<ProfileDto> = ({ ...user }) => {
  const prefName = RESIDENCE.find(
    (pref) => user?.residence === pref.code
  )?.name;

  const genderLabel = GENDER_ITEM.find(
    (gender) => user?.gender === gender.value
  )?.label;

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Container maxWidth="xs">
          <Stack
            spacing={2}
            sx={{
              m: "0 auto",
              p: "48px 0",
            }}
          >
            <div>
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
                <Typography
                  color={theme.palette.customDarkGreen.main}
                  // TODO:フォントをボールドに設定する
                  sx={{ mb: 2, pt: 6, fontWeight: 600 }}
                >
                  #その他
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    mb: 2,
                  }}
                >
                  <Box sx={{ color: "grey.600", maxWidth: 100 }}>
                    自分を三言で表すと
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: "8px",
                    }}
                  >
                    <Box sx={{ color: "black" }}>{user?.selfExpression[0]}</Box>
                    <Box sx={{ color: "black" }}>{user?.selfExpression[1]}</Box>
                    <Box sx={{ color: "black" }}>{user?.selfExpression[2]}</Box>
                  </Box>
                </Box>
              </Box>
            </div>
          </Stack>
        </Container>
      </Paper>
    </Container>
  );
};
