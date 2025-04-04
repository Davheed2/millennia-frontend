import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { findPostById } from "@/lib/blog-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogArticle({ params }: { params: { id: string } }) {
  const post = findPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 text-invest">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <Badge className="mb-4 bg-invest/10 text-invest">
              {post.category}
            </Badge>

            <h1 className="heading-xl mb-6">{post.title}</h1>

            <div className="flex items-center mb-8">
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">
                  {post.authorRole ? `${post.authorRole} • ` : ""}
                  {post.date}
                </p>
              </div>
            </div>

            <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-invest prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="heading-md mb-6">Related Articles</h3>
              <div className="flex justify-between">
                <Link href="/blog">
                  <Button className="bg-invest hover:bg-invest-secondary text-white">
                    Browse More Articles
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
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
