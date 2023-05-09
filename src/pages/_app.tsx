import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { ThemeProvider, styled } from "@mui/material/styles";

import { Header } from "../client/Header";
import { Footer } from "../client/Footer";
import theme from "../client/theme/Color";
import { axiosInstance } from "../client/axiosInstance";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { loginUserAtom } from "../client/Atom";
import { IUser } from "../models/UserDataSchema";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendHttpRequest } from "../client/stopRenderSleep";

function MyApp({ Component, pageProps }: AppProps) {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const router = useRouter();

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get<IUser>("/api/profile");
      if (!data) {
        router.push("/");
        return;
      }
      setLoginUser(data);
    } catch (err) {
      // TODO: 処理を記述する
      // if (err instanceof AxiosError) {
      //   router.push("/");
      // }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Renderにリクエストを送信📧");
      sendHttpRequest();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SGlobalWrap>
          <Header />
          <div>
            <Component {...pageProps} />
          </div>
          <Footer />
          <ToastContainer />
        </SGlobalWrap>
      </ThemeProvider>
    </>
  );
}

const SGlobalWrap = styled("div")({
  background: theme.palette.customBackground.main,
  backgroundImage: "url(/bards.svg)",
});

export default MyApp;
