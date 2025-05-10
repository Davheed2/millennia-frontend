import type { Metadata } from "next";

interface MetaDataProps {
  title: string;
  content: string;
  image?: string;
  url?: string;
}

export function generatePageMetadata({
  title,
  content,
  image,
  url,
}: MetaDataProps): Metadata {
  const defaultImage = "/millenia.jpg";

  return {
    title: `${title}`,
    description: content,
    openGraph: {
      type: "website",
      siteName: "Millenni trades",
      locale: "en_US",
      title: `${title}`,
      description: content,
      url: url || "https://millenniatrades.com",
      //images: ["opengraph-image.jpg"],
      images: [
        {
          url: "opengraph-image.jpg", // Use provided image or default
          width: 1200, // Optional width
          height: 630, // Optional height
          alt: "Millennia Trades", // Optional alt text
        },
      ],
    },
    twitter: {
      card: image || defaultImage ? "summary_large_image" : "summary",
      title: `${title}`,
      description: content,
      images: ["millenia.jpg"],
    },
    other: {
      "og:locale": "en_US",
    },
    metadataBase: new URL("https://millenniatrades.com"),
  };
}
