import type { NextPage } from "next";
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
