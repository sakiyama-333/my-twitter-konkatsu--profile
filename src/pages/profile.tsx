import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { Profile } from "../client/pages/user/Profile";

import { SEO } from "../client/SEO";

const ProfilePage: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description="" />
      <Profile />
    </>
  );
};

export default ProfilePage;
