import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { Footer } from "../client/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <div>
        <h1>😀😀😀😀😀😀😀😀</h1>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
