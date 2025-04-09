import {
  DollarSign,
  PieChart,
  Shield,
  Smartphone,
  Clock,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <DollarSign className="h-10 w-10 text-[#1D4ED8]" />,
    title: "Low Fees",
    description:
      "Just 0.25% annual management fee with no hidden costs. Keep more of your returns.",
  },
  {
    icon: <PieChart className="h-10 w-10 text-[#1D4ED8]" />,
    title: "Diversified Portfolios",
    description:
      "Automatically diversified investments across stocks, bonds, and ETFs to optimize returns.",
  },
  {
    icon: <Shield className="h-10 w-10 text-[#1D4ED8]" />,
    title: "Bank-Level Security",
    description:
      "Your investments are protected with 256-bit encryption and two-factor authentication.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-[#1D4ED8]" />,
    title: "Invest On The Go",
    description:
      "Manage your portfolio anytime, anywhere with our mobile apps and responsive website.",
  },
  {
    icon: <Clock className="h-10 w-10 text-[#1D4ED8]" />,
    title: "Automated Rebalancing",
    description:
      "We automatically rebalance your portfolio to maintain your target asset allocation.",
  },
  {
    icon: <Users className="h-10 w-10 text-[#1D4ED8]" />,
    title: "Expert Support",
    description:
      "Get help from our team of financial experts whenever you need guidance.",
  },
];

const Features = () => {
  return (
    <section className="bg-[#EFF6FF] py-12 md:py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Cutting edge features for better experience
          </h2>
          <p className="text-foreground/70">
            Our platform combines cutting-edge technology with financial
            expertise to provide you with the best investment experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-[#1D4ED8]/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
