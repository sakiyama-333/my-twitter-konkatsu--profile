import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { SEO } from "../client/SEO";
import { Index } from "../client/pages/Index";

const Home: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description="" />
      <Index />
    </>
  );
};

export default Home;
