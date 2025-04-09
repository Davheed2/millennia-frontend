import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { featuredPost, blogPosts, allCategories } from "@/lib/blog-utils";
import { Suspense } from "react";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">
              Millenia Trades Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, education, and expert perspectives to help you make
              smarter investment decisions.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="text-center py-8">Loading blog posts...</div>
            }
          >
            {/* BlogList is client-side and uses useSearchParams indirectly via BlogSearch */}
            <BlogList
              posts={blogPosts}
              featuredPost={featuredPost}
              categories={allCategories}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
