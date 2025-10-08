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
  //const defaultImage = "/millennniaa.png";
  const defaultImage = "/millennnia.png";

  return {
    title: `${title}`,
    description: content,
    openGraph: {
      type: "website",
      siteName: "Millennia trades",
      locale: "en_US",
      title: `${title}`,
      description: content,
      url: url || "https://www.milleniatrades.com",
      images: ["opengraph-image.png"],
      // images: [
      //   {
      //     // url: "https://www.milleniatrades.com/opengraph-image.png?v=2",
      //     url: "https://www.milleniatrades.com/opengraph-imagee.png?v=3",
      //     width: 300,
      //     height: 200,
      //     alt: "Millennia Trades Open Graph Image",
      //   },
      // ],
    },
    twitter: {
      card: image || defaultImage ? "summary" : "summary",
      title: `${title}`,
      description: content,
      images: ["https://www.milleniatrades.com/millennnia.png"],
      //images: ["https://www.milleniatrades.com/millennniaa.png"],
    },
    other: {
      "og:locale": "en_US",
    },
    metadataBase: new URL("https://www.milleniatrades.com"),
  };
}
