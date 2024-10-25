import { PageProps, graphql } from "gatsby";

import Layout from "../components/Layout";
import React from "react";
import Seo from "../components/Seo";

function Blog({ data }: PageProps<Queries.BlogTitlesQuery>) {
  return (
    <Layout title="Blog">
      <ul>
        {data.allFile.nodes.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </Layout>
  );
}

export default Blog;

export const query = graphql`
  query BlogTitles {
    allFile {
      nodes {
        name
      }
    }
  }
`;

export const Head = () => <Seo title="Blog" />;
