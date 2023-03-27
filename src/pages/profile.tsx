import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";

import { SEO } from "../client/SEO";
import { UserProfile } from "../client/pages/Profile";

const Profile: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description="" />
      <UserProfile />
    </>
  );
};

export default Profile;
