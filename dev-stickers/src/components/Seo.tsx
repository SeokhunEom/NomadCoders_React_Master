import React from "react";

interface SeoProps {
  title: string;
}

function Seo({ title }: SeoProps) {
  return <title>{title} | DevStickers!</title>;
}

export default Seo;
