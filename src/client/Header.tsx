import { FC } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <>
      <Sheader>
        <Link href="/">
          <Image
            className="logo_image"
            src="/logo.svg"
            alt="logo image"
            width={120}
            height={70}
          />
        </Link>
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
