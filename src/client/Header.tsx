import { FC } from "react";
import Image from "next/image";
import {
  AppBar,
  Avatar,
  Container,
  Paper,
  ThemeProvider,
  Toolbar,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import theme from "./theme/Color";
import { useAtom } from "jotai";
import loginUserAtom from "./Atom";
import Link from "next/link";

export const Header: FC = () => {
  const [loginUser] = useAtom(loginUserAtom);
  return (
    <ThemeProvider theme={theme}>
      <Sheader>
        <Sdecoration />
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <Image
              className="logo_image"
              src="/logo.svg"
              alt="logo image"
              width={120}
              height={70}
            />
          </Link>
          <Grid container spacing={2}>
            <Grid>
              <SearchIcon
                sx={{
                  width: 40,
                  height: 40,
                  color: theme.palette.customDarkGreen.main,
                }}
              />
            </Grid>
            <Grid key={loginUser?._id}>
              <Avatar
                alt={loginUser?.name}
                src={loginUser?.profilePhoto as string}
                sx={{ width: 40, height: 40 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Sheader>
    </ThemeProvider>
  );
};

const Sheader = styled("header")({
  marginBottom: "48px",
  background: theme.palette.customMintGreen.main,
});

const Sdecoration = styled("div")({
  height: "5px",
  background: theme.palette.customPink.main,
});
