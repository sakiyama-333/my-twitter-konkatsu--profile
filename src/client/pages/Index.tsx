import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useRouter } from "next/router";

import { Container } from "@mui/material";

import { UserList } from "./UserList";
import { PrimaryButton } from "../CustomButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const Index: FC = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const googleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      router.replace(`${API_URL}/auth/google`);
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

  const twitterAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      router.replace(`${API_URL}/auth/twitter`);
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
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          pb: "48px",
        }}
      >
        {/* TODO: Googleログイン用のボタンを別途用意する */}
        <PrimaryButton type="submit" variant="contained" onClick={googleAuth}>
          Googleでログイン／登録
        </PrimaryButton>
        <PrimaryButton type="submit" variant="contained" onClick={twitterAuth}>
          Twitterでログイン／登録
        </PrimaryButton>
      </Container>
      <UserList />
    </div>
  );
};
