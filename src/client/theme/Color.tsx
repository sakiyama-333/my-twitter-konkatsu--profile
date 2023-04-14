import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    customPink: {
      light: "#F8B8B8",
      main: "#F58C8C",
      dark: "#DB7F7F",
    },
    customMintGreen: {
      light: "#CCE9EA",
      main: "#A7DADB",
      dark: "#83CBCC",
    },
    customDarkGreen: {
      light: "#126B6D",
      main: "#0B4142",
      dark: "#062526",
    },
    customAccent: {
      light: "#FFDC2D",
      main: "#FFE147",
      dark: "#FFD714",
    },
    customBackground: {
      light: "#F9ECCC",
      main: "#FBF5E6",
      dark: "#F3E2B8",
    },
  },
});

export default theme;
