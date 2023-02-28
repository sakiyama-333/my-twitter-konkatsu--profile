import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { Header } from "../client/Header";
import { Footer } from "../client/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Header />
      <div>
        <h1>😀😀😀😀😀😀😀😀</h1>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
