import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SignUpPage } from "../client/register/SignUpPage";
import { useEffect } from "react";
import axios from "axios";
import { SEO } from "../client/SEO";

const Home: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description=""/>
        <SignUpPage />
    </>
  );
};


export default Home;
