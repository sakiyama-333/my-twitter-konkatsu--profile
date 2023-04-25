import { FC } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "./theme/Color";



export const PrimaryButton = styled(Button)({
  color: "#ffffff",
  background: theme.palette.customPink.main,
  ":hover": {
    background: theme.palette.customPink.dark,
  },
});


//TODO: 他の種類のボタンもつくる