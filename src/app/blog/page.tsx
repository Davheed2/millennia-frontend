import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlogList from "@/components/BlogList";
import { featuredPost, blogPosts, allCategories } from "@/lib/blog-utils";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Millenia Trades Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights, education, and expert perspectives to help you make
              smarter investment decisions.
            </p>
          </div>

          <BlogList
            posts={blogPosts}
            featuredPost={featuredPost}
            categories={allCategories}
          />

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-center mb-6">
              Get the latest investment insights, market updates, and financial
              education delivered directly to your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input
                placeholder="Your email address"
                className="border-2 border-gray-200"
              />
              <Button className="bg-invest hover:bg-invest-secondary text-white whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
