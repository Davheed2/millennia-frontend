import Transactionss from "@/components/DashboardTransactions";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";
export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Transaction History | Millennia Trades",
    content:
      "View and manage your transaction history, including deposits, withdrawals, and investments. Filter by status, type, and date to track your financial activities.",
    url: "https://millenniatrades.com/dashboard/transactions",
  });
};

export default function Transactions() {
  return (
    <>
      <Transactionss />
    </>
  );
}
