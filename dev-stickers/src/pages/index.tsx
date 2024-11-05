import Layout from "../components/Layout";
import React from "react";
import Seo from "../components/Seo";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout title="Welcome to DevStickers">
      <StaticImage
        width={200}
        src="https://images.unsplash.com/photo-1625768376503-68d2495d78c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
        alt="dev stickers"
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Home" />;
