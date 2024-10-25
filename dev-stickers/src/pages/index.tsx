import Layout from "../components/Layout";
import { Link } from "gatsby";
import React from "react";
import Seo from "../components/Seo";

const IndexPage = () => {
  return (
    <Layout title="Welcome to DevStickers">
      <div></div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Home" />;
