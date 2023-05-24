import type { NextPage } from "next";

import { SEO } from "../client/SEO";
import { Search } from "../client/pages/Search";

const SearchPage: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description="" />
      <Search />
    </>
  );
};

export default SearchPage;
