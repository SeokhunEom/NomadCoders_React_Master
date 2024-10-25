import Layout from "../components/Layout";
import React from "react";
import Seo from "../components/Seo";

function AboutUs() {
  return (
    <Layout title="About Us">
      <p>We are the happiest sticker store.</p>
    </Layout>
  );
}

export default AboutUs;

export const Head = () => <Seo title="About Us" />;
