import axios, { AxiosError } from "axios";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IUser } from "../../models/UserDataSchema";
import { Avatar, Button, Container, Paper, Stack } from "@mui/material";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const UserProfile: FC = () => {
  const [userItems, setUserItems] = useState<IUser[]>([]);
  const router = useRouter();

  const getUser = async () => {
    try {
      console.log("🤕🤒");
      const res = await axios.get<IUser[]>(`${API_URL}/api/profile`, {
        withCredentials: true,
      });
      const user = res.data;
      console.log({ user });
      if (!user) return;
      setUserItems(user);
    } catch (err) {
      if (err instanceof AxiosError) {
        // router.replace("/error"); //エラーが出た場合はエラーページに飛ばす
        console.log(err.stack);
        console.log(`🍵ゲットエラー${err}`);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container maxWidth="md">
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
                    <Avatar
                      alt={item.name}
                      src={item.profilePhoto as string}
                      sx={{ width: 60, height: 60 }}
                    />
                    <p>Name：{item.name}</p>
                    <p>Gender：{item.gender}</p>
                    <p>Age：{item.age}</p>
                    <p>Residence：{item.residence}</p>
                  </div>
                );
              })}
            </div>
          </Stack>
        </Container>
        <Container maxWidth="lg" sx={{ textAlign: "center", pb: "48px" }}>
          <Button type="submit" variant="outlined" sx={{ width: "25%" }}>
            登録
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};
