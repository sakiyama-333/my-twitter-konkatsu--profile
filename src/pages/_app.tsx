import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { styled } from "@mui/material/styles";

import { Header } from "../client/Header";
import { Footer } from "../client/Footer";
// import { COLOR } from "../client/theme/Color";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <SGlobalWrap>
        <Header />
        <div>
          <Component {...pageProps} />
        </div>
        <Footer />
      </SGlobalWrap>
    </>
  );
}

const SGlobalWrap = styled("div")({
  // backgroundColor: COLOR.BACKGROUND_COLOR,
  backgroundImage: "url(/bards.svg)",
});

export default MyApp;
