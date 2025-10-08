import { generatePageMetadata } from "@/components/common/PageMetaData";
import GoalPlanner from "@/components/GoalPlanner";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Retirement Goal Planner | Millennia Trades",
    content:
      "Plan your retirement goals with the Retirement Goal Planner. Set clear targets, track progress, and adjust your strategy for a secure financial future. Start planning today and achieve your retirement dreams.",
    url: "https://milleniatrades.com/retirement/goal-planner",
  });
};

export default function RetirementGoalPlanner() {
  return (
    <>
      <GoalPlanner />
    </>
  );
}
