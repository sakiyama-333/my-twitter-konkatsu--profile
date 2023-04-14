import { FC } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "./theme/Color";

type ButtonProps = {
  label: string;
};

export const CustomButton: FC<ButtonProps> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton type="submit" variant="contained">
        {props.label}
      </StyledButton>
    </ThemeProvider>
  );
};

const StyledButton = styled(Button)({
  width: "25%",
  color: "#ffffff",
  background: theme.palette.customPink.main,
  ":hover": {
    background: theme.palette.customPink.dark,
  },
});
