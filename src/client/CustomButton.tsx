import { FC } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "./theme/Color";

export const PrimaryButton = styled(Button)({
  color: "#ffffff",
  // background: theme.palette.customPink.main,
  background: theme.palette.customPink.main,
  border: `1px solid ${theme.palette.customPink.main}`,
  ":hover": {
    // background: theme.palette.customPink.dark,
    background: "#ffffff",
    border: `1px solid ${theme.palette.customPink.main}`,
    color: theme.palette.customPink.main,
  },
});

//TODO: 他の種類のボタンもつくる
