import { FC } from "react";
import Image from "next/image";
import { Link, styled } from "@mui/material";

import { BsTwitter, BsGithub } from "react-icons/bs";
import theme from "./theme/Color";

const linkItems = [
  {
    text: "トップ",
    link: "/",
    AfterIcon: null,
  },
  // {
  //   text: "使い方",
  //   link: "about",
  // },
  // {
  //   text: "ご意見",
  //   link: "contact",
  // },
  // {
  //   text: "利用規約",
  //   link: "terms",
  // },
  // {
  //   text: "プライバシーポリシー",
  //   link: "privacy",
  // },
  {
    text: "作った人",
    link: "https://twitter.com/yamiko_333_dev",
    AfterIcon: BsTwitter,
  },
  {
    text: "GitHub",
    link: "https://github.com/yamiko-333/my-twitter-konkatsu--profile",
    AfterIcon: BsGithub,
  },
  // {
  //   text: "職をください🙇",
  //   link: "/",
  // },
] as const;

export const Footer: FC = () => {
  return (
    <div>
      <Sfooter>
        <Slayout>
          <Image src="/logo.svg" alt="logo image" width={120} height={120} />
          <SlinkItem className="linkItem">
            {linkItems.map(({ AfterIcon, link, text }) => {
              return (
                <SLink
                  href={link}
                  color={theme.palette.customDarkGreen.main}
                  key={text}
                >
                  <span>{text}</span>
                  <span>{AfterIcon && AfterIcon({})}</span>
                  {/* {AfterIcon && <AfterIcon />} */}
                </SLink>
              );
            })}
          </SlinkItem>
          <div className="logoAndCopyright">
            <small>&copy; 2023 TWIKON - ツイコン</small>
          </div>
        </Slayout>
      </Sfooter>
    </div>
  );
};

const Sfooter = styled("footer")({
  width: "100%",
  marginTop: "48px",
  padding: "40px 0",
  background: theme.palette.customMintGreen.main,
  borderBottom: `5px solid ${theme.palette.customPink.main}`,
});

const Slayout = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  width: "90%",
  margin: "0 auto",

  "& .logoAndCopyright": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    color: theme.palette.customDarkGreen.main,
    fontSize: "10px",
    textAlign: "center",
  },
});

const SlinkItem = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const SLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  textDecoration: "none",
  transition: "0.5s",
  "& > span": {
    display: "flex",
    alignItems: "flex-end",
    "& > svg": {
      height: "18px",
      width: "18px",
    },
  },
});
