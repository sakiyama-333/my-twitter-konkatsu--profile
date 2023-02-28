import { FC } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <>
      <Sheader>
        <a href="#">
          <Image src="/logo.svg" alt="logo image" width={120} height={70} />
        </a>
      </Sheader>
    </>
  );
};

const Sheader = styled("footer")({
  width: "90%",
  margin: " 8px auto",
});
