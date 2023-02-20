import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  title: string;
  description: string;
};

export const SEO: FC<Props> = ({
  title,
  description
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
