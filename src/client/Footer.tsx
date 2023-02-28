import TwitterIcon from "@mui/icons-material/Twitter";
import styled from "@emotion/styled";
import { FC } from "react";
import Image from "next/image";
import { COLOR } from "../client/ColorTheme";

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
    <Sfooter>
      <Image src="/logo.svg" alt="logo image" width={120} height={70} />
      <div className="linkItem">
        {linkItems.map((item) => {
          if (item !== "作った人") {
            return (
              <a href="#" key={item}>
                {item}
              </a>
            );
          } else {
            return (
              <a href="#" key={item}>
                {item}
                <TwitterIcon />
              </a>
            );
          }
        })}
      </div>
      <div className="logoAndCopyright">
        <small>&copy; 2023 MY Twitter 婚活プロフィール</small>
      </div>
    </Sfooter>
  );
};

const Sfooter = styled("footer")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  width: "100%",
  backgroundColor: COLOR.MAIN_MINT_GREEN,
  padding: "40px",
  "& > .linkItem": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    alignItems: "center",
    gap: "12px 24px",
    "& > a": {
      color: COLOR.DARK_GREEN,
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
    color: COLOR.DARK_GREEN,
    fontSize: "10px",
    textAlign: "center",
  },
});
