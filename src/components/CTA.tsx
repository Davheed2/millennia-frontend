import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="container section-padding">
      <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start building your financial future today
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <p className="text-white/90">
                  Join thousands of investors growing their wealth
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <p className="text-white/90">
                  Personalized portfolio based on your goals
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <p className="text-white/90">
                  Low 0.25% annual fee with no hidden costs
                </p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <Link href="/signup">
                <Button className="bg-white hover:bg-[#10B981] hover:text-white text-[#1D4ED8] font-medium">
                  Open an Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <Image
              src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              alt="Financial planning"
              className="object-cover h-full w-full"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
