import axios, { AxiosError } from "axios";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Button, Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import { IUser } from "../../models/UserDataSchema";
import { UserList } from "./UserList";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(process.env.NEXT_PUBLIC_API_URL, "😀");
export const Index: FC = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const reactHookFormReturn = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      router.replace(`${API_URL}/auth/google`);
      // await axios.get(endPoint);
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
            Googleでログイン／登録
          </Button>
        </Container>
      </form>
      <UserList />
    </div>
  );
};
