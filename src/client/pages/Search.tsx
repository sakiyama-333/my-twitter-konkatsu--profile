import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IUser } from "../../models/UserDataSchema";
import {
  Box,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../theme/Color";
import { axiosInstance } from "../axiosInstance";
import { UserList } from "./UserList";
import { PrimaryButton } from "../CustomButton";
import { toast } from "react-toastify";

export type SearchUser = {
  fromAge: number;
  toAge: number;
};
export const Search: FC = () => {
  const reactHookFormReturn = useForm<SearchUser>();
  const [residance, useResidance] = useState([]);
  const [users, setUsers] = useState<IUser[] | null>(null);

  const {
    register,
    formState: { errors },
  } = reactHookFormReturn;

  const onSubmit: SubmitHandler<SearchUser> = async (data) => {
    const result = await axiosInstance.post<IUser[]>("/api/users/search", data);
    //TODO: エラー処理いるかも
    setUsers(result.data);
    if (!result.data.length) {
      toast.error("ユーザーが見つかりませんでした", {
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
  function showUserList() {
    if (!users) return null;
    if (!users.length) return <div>見つかりませんでした</div>;
    return <UserList users={users} />;
  }
  return (
    <>
      <form onSubmit={reactHookFormReturn.handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Paper elevation={3}>
            <Container maxWidth="xs">
              <Stack
                spacing={4}
                sx={{
                  width: "90%",
                  maxWidth: "480px",
                  m: "0 auto",
                  p: "48px 0",
                }}
              >
                <Box sx={{ mt: 5 }}>
                  <Typography
                    color={theme.palette.customDarkGreen.main}
                    // TODO:フォントをボールドに設定する
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    検索条件
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ color: "grey.600", minWidth: "80px" }}>年齢</Box>
                    <TextField
                      required
                      label=""
                      error={!!errors?.fromAge}
                      helperText={errors?.fromAge?.message}
                      type="number"
                      variant="standard"
                      defaultValue={""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">歳</InputAdornment>
                        ),
                      }}
                      sx={{
                        ".MuiFormLabel-asterisk": {
                          color: theme.palette.error.main,
                        },
                      }}
                      {...register("fromAge", {
                        required: "入力必須項目です",
                        valueAsNumber: true,
                        minLength: {
                          value: 2,
                          message: "2桁以内で入力してください",
                        },
                        maxLength: {
                          value: 2,
                          message: "2桁以内で入力してください",
                        },
                      })}
                    />
                    <p>~</p>
                    <TextField
                      required
                      label=""
                      error={!!errors?.toAge}
                      helperText={errors?.toAge?.message}
                      type="number"
                      variant="standard"
                      defaultValue={""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">歳</InputAdornment>
                        ),
                      }}
                      sx={{
                        ".MuiFormLabel-asterisk": {
                          color: theme.palette.error.main,
                        },
                      }}
                      {...register("toAge", {
                        required: "入力必須項目です",
                        valueAsNumber: true,
                        minLength: {
                          value: 2,
                          message: "2桁以内で入力してください",
                        },
                        maxLength: {
                          value: 2,
                          message: "2桁以内で入力してください",
                        },
                      })}
                    />
                  </Box>
                </Box>
              </Stack>
              <Container maxWidth="lg" sx={{ textAlign: "center", pb: "48px" }}>
                <PrimaryButton type="submit" variant="contained">
                  検索
                </PrimaryButton>
              </Container>
            </Container>
          </Paper>
        </Container>
      </form>
      {users && <UserList users={users} />}
    </>
  );
};
