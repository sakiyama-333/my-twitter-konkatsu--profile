import type { NextPage } from "next";

import { SEO } from "../client/SEO";
import { UserList } from "../client/pages/UserList";

const Users: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description="" />
      <UserList />
    </>
  );
};

export default Users;
