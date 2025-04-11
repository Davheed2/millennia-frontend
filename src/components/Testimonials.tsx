import { Star } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "Millennia Trades has completely changed how I think about investing. The platform is intuitive, and I've seen consistent returns that have outperformed my previous investments.",
    author: "Olivia Parker",
    role: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
  },
  {
    quote:
      "As someone new to investing, I was intimidated by the stock market. Millennia Trades made it approachable, and their educational resources helped me understand where my money is going.",
    author: "James Anderson",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    quote:
      "The automated rebalancing has saved me countless hours. I can focus on my career while my investments work for me. Customer service is also excellent when I have questions.",
    author: "Jessica Williams",
    role: "Healthcare Professional",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-white to-invest-light section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="heading-lg">What Our Clients Say</h2>
          <p className="text-foreground/70">
            Join thousands of satisfied investors who are building their future
            with Millennia Trades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.stars
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="flex-grow italic text-foreground/80 mb-6">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center mt-auto">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">T</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex -space-x-4">
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="https://randomuser.me/api/portraits/men/54.jpg"
                alt=""
                width={40}
                height={40}
              />
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="https://randomuser.me/api/portraits/women/63.jpg"
                alt=""
                width={40}
                height={40}
              />
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="https://randomuser.me/api/portraits/men/12.jpg"
                alt=""
                width={40}
                height={40}
              />
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="https://randomuser.me/api/portraits/women/37.jpg"
                alt=""
                width={40}
                height={40}
              />
            </div>
            <div className="text-center md:text-left">
              <p className="font-medium">Trusted by over 100,000 investors</p>
              <p className="text-sm text-foreground/60">
                From beginners to experienced investors
              </p>
            </div>
          </div>
          <div className="h-px w-full md:h-14 md:w-px bg-gray-200 md:mx-4"></div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-invest">93%</p>
              <p className="text-sm text-foreground/60">
                Customer satisfaction
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-invest-accent">12.7%</p>
              <p className="text-sm text-foreground/60">Avg. annual return</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-invest-secondary">$0</p>
              <p className="text-sm text-foreground/60">Account minimum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
