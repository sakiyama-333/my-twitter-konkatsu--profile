import { FC } from "react";
import Image from "next/image";
import { Link, ThemeProvider, styled } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

import theme from "./theme/Color";

const linkItems = [
  "トップ",
  "使い方",
  "ご意見",
  "利用規約",
  "プライバシーポリシー",
  "作った人",
  "職をください🙇",
] as const;

export const Footer: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Sfooter>
        <Slayout>
          <Image src="/logo.svg" alt="logo image" width={120} height={70} />
          <div className="linkItem">
            {linkItems.map((item) => {
              if (item !== "作った人") {
                return (
                  <Link
                    href="#"
                    key={item}
                    color={theme.palette.customDarkGreen.main}
                  >
                    {item}
                  </Link>
                );
              } else {
                return (
                  <Link
                    href="https://twitter.com/yamiko_333_dev"
                    key={item}
                    color={theme.palette.customDarkGreen.main}
                  >
                    {item}
                    <TwitterIcon />
                  </Link>
                );
              }
            })}
          </div>
          <div className="logoAndCopyright">
            <small>&copy; 2023 MY Twitter 婚活プロフィール</small>
          </div>
        </Slayout>
      </Sfooter>
    </ThemeProvider>
  );
};

const Sfooter = styled("footer")({
  width: "100%",
  marginTop: "48px",
  padding: "40px 0",
  background: theme.palette.customMintGreen.main,
});

const Slayout = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  width: "90%",
  margin: "0 auto",
  "& > .linkItem": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    alignItems: "center",
    gap: "12px 24px",
    "& > a": {
      textDecoration: "none",
      transition: "0.5s",
      "&:hover": {
        opacity: "0.5",
      },
      "& svg": {
        verticalAlign: "-5px",
      },
    },
  },
  "& .logoAndCopyright": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    color: theme.palette.customDarkGreen.main,
    fontSize: "10px",
    textAlign: "center",
  },
});
