import { FC } from "react";
import Image from "next/image";
import { Link, ThemeProvider, styled } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

import theme from "./theme/Color";

const linkItems = [
  {
    text: "トップ",
    link: "/",
  },
  {
    text: "使い方",
    link: "about",
  },
  {
    text: "ご意見",
    link: "contact",
  },
  {
    text: "利用規約",
    link: "terms",
  },
  {
    text: "プライバシーポリシー",
    link: "privacy",
  },
  {
    text: "作った人",
    link: "https://twitter.com/yamiko_333_dev",
  },
  {
    text: "職をください🙇",
    link: "/",
  },
] as const;

export const Footer: FC = () => {
  return (
      <div>
        <Sfooter>
          <Slayout>
            <Image src="/logo.svg" alt="logo image" width={120} height={70} />
            <div className="linkItem">
              {linkItems.map((item) => {
                if (item.text !== "作った人") {
                  return (
                    <Link
                      href={item.link}
                      key={item.text}
                      color={theme.palette.customDarkGreen.main}
                    >
                      {item.text}
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      href={item.link}
                      key={item.text}
                      color={theme.palette.customDarkGreen.main}
                    >
                      {item.text}
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
        <Sdecoration />
      </div>
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

const Sdecoration = styled("div")({
  height: "5px",
  background: theme.palette.customPink.main,
});
