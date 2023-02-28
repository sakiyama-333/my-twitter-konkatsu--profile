import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { Header } from "../client/Header";
import { Footer } from "../client/Footer";
import styled from "@emotion/styled";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Header />
      <Smain>
        <div>
          <h1>😀😀😀😀😀😀😀😀</h1>
          <Component {...pageProps} />
        </div>
      </Smain>
      <Footer />
    </>
  );
}

const Smain = styled("main")({
  width: "90%",
  margin: "0 auto",
});
export default MyApp;
