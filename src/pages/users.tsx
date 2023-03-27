import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { SEO } from "../client/SEO";
import { UserList } from "../client/UserList";

const Users: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description="" />
      <UserList />
    </>
  );
};

export default Users;
