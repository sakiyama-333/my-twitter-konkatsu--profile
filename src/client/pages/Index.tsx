import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Container } from "@mui/material";

import { UserList } from "./UserList";
import { axiosInstance } from "../axiosInstance";
import { IUser } from "../../models/UserDataSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const Index: FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get<IUser[]>("/api/users");
      const users = res.data;
      if (!users) return;
      setUsers(users);
    } catch (err) {
      if (err instanceof AxiosError) {
        // router.replace("/error"); //エラーが出た場合はエラーページに飛ばす
        console.log(err.stack);
        console.log(`🍵ゲットエラー${err}`);
      }
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          pb: "48px",
          minHeight: "100vh",
        }}
      >
        <UserList users={users} />
      </Container>
    </div>
  );
};
