import axios, { AxiosError } from "axios";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { IUser } from "../../models/UserDataSchema";
import { Button, Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserList } from "../UserList";

const port = process.env.NEXT_PUBLIC_PORT;
const endPoint = `http://localhost:${port}/api/login`;

export const Index: FC = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const reactHookFormReturn = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      await axios.post<IUser[]>(endPoint, data);
      router.push(`/profile?_id=${data._id}`);
      // router.push(`/mypage`);
      console.log(data._id);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setErrorMessage("構文エラーが出ました");
        return;
      }
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data);
        return;
      }
      setErrorMessage("予期せぬエラー");
    }
  };

  return (
    <div>
      <form
        className="InputFormParent"
        onSubmit={reactHookFormReturn.handleSubmit(onSubmit)}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center", pb: "48px" }}>
          <Button type="submit" variant="outlined" sx={{ width: "25%" }}>
            Twitterでログイン／登録
          </Button>
        </Container>
      </form>
      <UserList />
    </div>
  );
};
