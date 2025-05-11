import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { findPostById } from "@/lib/blog-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  const post = findPostById(params.id);

  if (!post) {
    return {
      title: "Post Not Found | Millennia Trades Blog",
      description: "We couldn't find the article you're looking for.",
    };
  }

  return {
    title: `${post.title} | Millennia Trades Blog`,
    description:
      post.excerpt ||
      "Explore insights from Millennia Trades on smart investing and financial strategies.",
    openGraph: {
      title: `${post.title} | Millennia Trades Blog`,
      description: post.excerpt || "",
      url: `https://millenniatrades.com/blog/${post.id}`,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Millennia Trades Blog`,
      description: post.excerpt || "",
      images: [post.image],
    },
  };
};

export default function BlogArticle({ params }: { params: { id: string } }) {
  const post = findPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="">
              <Link href="/blog">
                <Button variant="ghost" className="mb-4 mr-3 text-invest">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>

              <Badge className="mb-6 bg-invest/10 text-invest">
                {post.category}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center mb-8">
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">
                  {post.authorRole ? `${post.authorRole} • ` : ""}
                  {post.date}
                </p>
              </div>
            </div>

            <div className="relative h-[400px] w-full mb-12 rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:mb-6 prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-3 prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-invest prose-a:no-underline hover:prose-a:underline">
              <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
            </article>

            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Related Articles
              </h3>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link href="/blog">
                  <Button className="bg-invest hover:bg-invest-secondary text-white w-full sm:w-auto">
                    Browse More Articles
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
