import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { UserProfile } from "../../client/pages/users/UserProfile";

import { SEO } from "../../client/SEO";
import connectMongo from "../../server/mongooseConnect";
import { UserModel } from "../../models/UserDataSchema";
import { IUserToProfileDto, ProfileDto } from "../../server/profile.dto";

interface Props {
  user: ProfileDto | null;
}

const UserProfilePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  console.log({ user });
  if (!user) throw new Error("エラーが発生しました😭");
  return (
    //TODO:userがnullだったらエラーページを出す

    <>
      <SEO title={"ここにタイトル"} description="" />
      <UserProfile {...user} />
    </>
  );
};
export default UserProfilePage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      user: null,
    },
  };
  // const { params } = context;
  // const mongoConnection = await connectMongo();
  // const id = params!.id as string;
  // try {
  //   const user = await UserModel.findOne({ _id: id });
  //   if (!user) throw new Error("ユーザーが見つかりませんでした");
  //   return {
  //     props: {
  //       user: IUserToProfileDto(user),
  //     },
  //   };
  // } catch (err) {
  //   console.log(`😭${err}`);
  //   return {
  //     props: {
  //       user: null,
  //     },
  //   };
  // }
};

// const id = Array.isArray(params?.id) ? params?.id[0] : params.id
// ここで、idを使ってデータを取得するなどの処理を行う
