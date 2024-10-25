import { graphql, useStaticQuery } from "gatsby";

import React from "react";

interface SeoProps {
  title: string;
}

function Seo({ title }: SeoProps) {
  const data = useStaticQuery<Queries.SeoDataQuery>(graphql`
    query SeoData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <title>
      {title} | {data.site?.siteMetadata?.title}
    </title>
  );
}

export default Seo;
