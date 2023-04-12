import axios, { AxiosError } from "axios";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import { IUser } from "../../models/UserDataSchema";
import { COLOR } from "../ColorTheme";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const UserList: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const router = useRouter();

  const getAllUsers = async () => {
    try {
      console.log("🤕🤒");
      const res = await axios.get<IUser[]>(`${API_URL}/api/users`);
      const users = res.data;
      console.log({ users });
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
      <h2>ユーザー一覧</h2>
      <div>
        {users.map((user) => {
          return (
            <div key={user._id}>
              🍵
              <h3>Name：{user.name}</h3>
              <p>Gender：{user.gender}</p>
              <p>Age：{user.age}</p>
              <p>Residence：{user.residence}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
