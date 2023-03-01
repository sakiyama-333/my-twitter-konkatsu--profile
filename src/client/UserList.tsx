import axios from "axios";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import { IUser } from "../models/UserDataSchema";
import { COLOR } from "./ColorTheme";

const port = process.env.NEXT_PUBLIC_PORT;
const endPoint = `http://localhost:${port}/api/user`;

export const UserList: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const router = useRouter();

  const getAllUser = async () => {
    try {
      const res = await axios.get<IUser[]>(endPoint);
      const users = res.data;
      if (!users) return;
      setUsers(users);
    } catch (err) {
      router.replace("/error"); //エラーが出た場合はエラーページに飛ばす
      console.log(`🍵ゲットエラー${err}`);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <div>
        {users.map((user) => {
          return (
            <div key={user.name}>
              <h3>Name：{user.name}</h3>
              <p>Gender：{user.gender}</p>
              <p>Age：{user.age}</p>
              <p>Residence{user.residence}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
