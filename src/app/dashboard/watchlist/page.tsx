import Watchlist from "@/components/DashboardWatchlist";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "My Watchlist | Millennia Trades",
    content:
      "View and manage your investment watchlist. Keep track of the investments you're interested in and make informed decisions by monitoring their performance and current prices.",
    url: "https://millenniatrades.com/dashboard/watchlist",
  });
};

export default function Wishlists() {
  return (
    <>
      <Watchlist />
    </>
  );
}
