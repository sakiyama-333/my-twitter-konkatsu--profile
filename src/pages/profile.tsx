import type { NextPage } from "next";
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
