import { FC } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <>
      <Sheader>
        <a href="#">
          <Image
            className="logo_image"
            src="/logo.svg"
            alt="logo image"
            width={120}
            height={70}
          />
        </a>
      </Sheader>
    </>
  );
};

const Sheader = styled("header")({
  maxWidth: "900px",
  "& a": {
    display: "block",
    padding: " 20px",
  },
});
