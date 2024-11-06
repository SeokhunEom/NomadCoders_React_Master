import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/Layout";
import React from "react";
import Seo from "../components/Seo";

const IndexPage = ({ data }: PageProps<Queries.StickersQuery>) => {
  return (
    <Layout title="Welcome to DevStickers">
      {data.allContentfulSticker.nodes.map((sticker) => (
        <article key={sticker.name}>
          <GatsbyImage
            image={getImage(sticker.preview?.gatsbyImageData!)!}
            alt={sticker.name!}
          />
          <h2>{sticker.name}</h2>
          <h4>${sticker.price}</h4>
        </article>
      ))}
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Home" />;

export const query = graphql`
  query Stickers {
    allContentfulSticker {
      nodes {
        name
        price
        image {
          gatsbyImageData(placeholder: BLURRED, height: 250)
        }
      }
    }
  }
`;
