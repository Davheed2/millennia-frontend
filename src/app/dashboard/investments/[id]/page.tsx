import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { callApi } from "@/lib/helpers";
import { ApiResponse } from "@/interfaces";
import InvestmentDetailClient from "@/components/InvestmentDetail";
import { UserInvestment } from "@/interfaces/ApiResponse";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const { data: responseData, error } = await callApi<
      ApiResponse<UserInvestment[]>
    >(`/investment/find?investmentId=${params.id}`);

    if (error || !responseData?.data?.[0]) {
      return generatePageMetadata({
        title: "Investment Details | Millennia Trades",
        content:
          "View detailed information about your investment and track its performance.",
        url: `https://millenniatrades.com/dashboard/investments/${params.id}`,
      });
    }

    const investment = responseData.data[0];

    return generatePageMetadata({
      title: `${investment.name} (${investment.symbol}) | Millennia Trades`,
      content: `Track the performance of your ${investment.name} investment. Monitor real-time price updates, total value, and profit/loss metrics.`,
      url: `https://millenniatrades.com/dashboard/investments/${params.id}`,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return generatePageMetadata({
      title: "Investment Details | Millennia Trades",
      content:
        "View detailed information about your investment and track its performance.",
      url: `https://millenniatrades.com/dashboard/investments/${params.id}`,
    });
  }
}

export default function InvestmentPage({ params }: { params: { id: string } }) {
  return <InvestmentDetailClient investmentId={params.id} />;
}
