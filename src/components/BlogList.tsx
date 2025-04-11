"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-utils";
import BlogSearch from "./BlogSearch";
import BlogSkeleton from "./BlogSkeleton";

interface BlogListProps {
  posts: BlogPost[];
  featuredPost: BlogPost;
  categories: string[];
}

export default function BlogList({
  posts,
  featuredPost,
  categories,
}: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Simulated loading
  const postsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredPosts = [featuredPost, ...posts].filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Topics" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = filteredPosts.slice(0, indexOfLastPost);
  const hasMorePosts = indexOfLastPost < filteredPosts.length;

  const showingFeaturedPost =
    currentPage === 1 &&
    (selectedCategory === "All Topics" ||
      selectedCategory === featuredPost.category) &&
    (searchQuery === "" ||
      featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      featuredPost.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      featuredPost.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      featuredPost.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1000); // Simulate loading
  };

  return (
    <>
      <BlogSearch
        categories={categories}
        onSearch={setSearchQuery}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      {filteredPosts.length === 0 && !isLoading ? (
        <div className="max-w-4xl mx-auto text-center py-16">
          <h2 className="heading-lg mb-4">No articles found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn&apos;t find any articles matching your search criteria.
            Try adjusting your search or browse all articles.
          </p>
          <Button
            className="bg-invest hover:bg-invest-secondary text-white"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Topics");
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <>
          {showingFeaturedPost && (
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <Badge className="w-fit mb-2 bg-invest/10 text-invest">
                      {featuredPost.category}
                    </Badge>
                    <CardTitle className="text-2xl mb-4">
                      {featuredPost.title}
                    </CardTitle>
                    <CardContent className="p-0 mb-4 flex-grow">
                      <p className="text-muted-foreground">
                        {featuredPost.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex-col items-start p-0">
                      <div className="mb-4">
                        <p className="font-medium">{featuredPost.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {featuredPost.authorRole} • {featuredPost.date}
                        </p>
                      </div>
                      <Link href={`/blog/${featuredPost.id}`}>
                        <Button className="bg-invest hover:bg-invest-secondary text-white">
                          Read Article
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="heading-lg mb-8">
              {searchQuery ? "Search Results" : "Latest Articles"}
            </h2>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...Array(postsPerPage)].map((_, i) => (
                  <BlogSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {currentPosts
                  .filter(
                    (post) =>
                      post.id !== featuredPost.id || !showingFeaturedPost
                  )
                  .map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden flex flex-col h-full"
                    >
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <Badge className="w-fit mb-2 bg-invest/10 text-invest">
                          {post.category}
                        </Badge>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {post.date} • {post.author}
                          </p>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <Button variant="ghost" className="text-invest">
                            Read More →
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}

            <div className="text-center mt-10">
              {hasMorePosts && !isLoading ? (
                <Button
                  className="bg-invest hover:bg-invest-secondary text-white"
                  onClick={handleLoadMore}
                >
                  Load More Articles
                </Button>
              ) : (
                !isLoading &&
                filteredPosts.length > 0 && (
                  <p className="text-muted-foreground">
                    You&apos;ve reached the end of the articles.
                  </p>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}