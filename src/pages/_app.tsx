import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "../client/ColorTheme";

function MyApp({ Component, pageProps }: AppProps) {
  // const theme = createTheme({
  //   components: {
  //     MuiButton: {
  //       defaultProps: {
  //         fullWidth: true,
  //       },
  //     },
  //   },
  // });
  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <h1>😀😀😀😀😀😀😀😀</h1>
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default MyApp;
