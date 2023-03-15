import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Avatar, Button, Container, Paper, Stack } from "@mui/material";

import { IUser } from "../models/UserDataSchema";
import Grid from "@mui/material/Unstable_Grid2";

const port = process.env.NEXT_PUBLIC_PORT;
const endPoint = `http://localhost:${port}/api/user`;

export const ProfilePage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const router = useRouter();

  // const getAllUser = async () => {
  //   try {
  //     const res = await axios.get<IUser[]>(endPoint);
  //     const user = data;
  //     if (!user) return;
  //     setUsers(user);
  //   } catch (err) {
  //     router.replace("/error"); //エラーが出た場合はエラーページに飛ばす
  //     console.log(`🍵ゲットエラー${err}`);
  //   }
  // };

  // useEffect(() => {
  //   getAllUser();
  // }, []);

  return (
    <Container maxWidth="md">
      <Button type="submit" variant="outlined" sx={{ width: "25%" }}>
        登録
      </Button>
      <Paper elevation={3}>
        <Container maxWidth="xs">
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              width: "90%",
              m: "0 auto",
              p: "48px 0",
            }}
          >
            <Avatar
              alt="user Image"
              src="dummy.png"
              sx={{ width: 60, height: 60 }}
            />
            <Stack
              sx={{
                "& p": {
                  m: "0",
                },
              }}
            >
              <p>ユーザーネーム</p>
              <p>@user-id</p>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            {users.map((user) => {
              return (
                // <div key={user.name}>
                <div key={user._id}>
                  🍵
                  {/* <h3>Name：{user.name}</h3> */}
                  <p>Gender：{user.gender}</p>
                  <p>Age：{user.age}</p>
                  <p>Residence：{user.residence}</p>
                </div>
              );
            })}
          </Stack>
        </Container>
      </Paper>
    </Container>
  );
};
