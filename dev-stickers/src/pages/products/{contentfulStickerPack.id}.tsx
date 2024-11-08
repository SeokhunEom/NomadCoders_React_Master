import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PageProps, graphql } from "gatsby";

import Layout from "../../components/Layout";
import React from "react";

export default function ProductDetail({
  data,
}: PageProps<Queries.ProductQuery>) {
  const image = getImage(data.contentfulStickerPack?.preview?.gatsbyImageData!);

  return (
    <Layout title={data.contentfulStickerPack?.name!}>
      <GatsbyImage image={image!} alt={data.contentfulStickerPack?.name!} />
      <h2>${data.contentfulStickerPack?.price}</h2>
    </Layout>
  );
}

export const query = graphql`
  query Product($id: String!) {
    contentfulStickerPack(id: { eq: $id }) {
      name
      price
      preview {
        gatsbyImageData(height: 250, placeholder: BLURRED)
      }
    }
  }
`;
