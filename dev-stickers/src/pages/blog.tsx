import Layout from "../components/Layout";
import React from "react";
import Seo from "../components/Seo";

function Blog() {
  return (
    <Layout title="Blog">
      <p>The recent news from my shop.</p>
    </Layout>
  );
}

export default Blog;

export const Head = () => <Seo title="Blog" />;
