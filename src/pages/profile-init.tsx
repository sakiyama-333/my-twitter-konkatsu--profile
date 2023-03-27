import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";

import { SEO } from "../client/SEO";
import { ProfileInit } from "../client/pages/profileInit/Index";

const Profile: NextPage = () => {
  return (
    <>
      <SEO title={"ここにタイトル"} description="" />
      <ProfileInit />
    </>
  );
};

export default Profile;
