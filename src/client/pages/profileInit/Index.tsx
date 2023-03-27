import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Button, Container, Paper, Stack } from "@mui/material";

import { IUser } from "../../../models/UserDataSchema";
import { Age } from "./register/Age";
import { Gender } from "./register/Gender";
import { Residence } from "./register/Residence";
import { Height } from "./register/Height";

const port = process.env.NEXT_PUBLIC_PORT;
const endPoint = `http://localhost:${port}/api/user`;

export const ProfileInit: FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
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
    <Container maxWidth="md">
      <Paper elevation={3}>
        <form
          className="InputFormParent"
          onSubmit={reactHookFormReturn.handleSubmit(onSubmit)}
        >
          <Container maxWidth="xs">
            <Stack
              spacing={2}
              sx={{
                width: "90%",
                m: "0 auto",
                p: "48px 0",
              }}
            >
              <Gender reactHookFormReturn={reactHookFormReturn} />
              <Age reactHookFormReturn={reactHookFormReturn} />
              <Residence reactHookFormReturn={reactHookFormReturn} />
              <Height reactHookFormReturn={reactHookFormReturn} />
            </Stack>
          </Container>
          <Container maxWidth="lg" sx={{ textAlign: "center", pb: "48px" }}>
            <Button type="submit" variant="outlined" sx={{ width: "25%" }}>
              登録
            </Button>
          </Container>
        </form>
      </Paper>
    </Container>
  );
};
