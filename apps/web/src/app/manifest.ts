import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JL Studio",
    short_name: "JL Studio",
    description:
      "Studio de création web sur mesure. Sites vitrine, e-commerce et applications haut de gamme.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0a1628",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
