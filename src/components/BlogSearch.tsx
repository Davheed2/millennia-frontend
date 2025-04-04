"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogSearchProps {
  categories: string[];
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  searchQuery: string;
}

export default function BlogSearch({
  categories,
  onSearch,
  onCategorySelect,
  selectedCategory,
  searchQuery: initialSearchQuery,
}: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");

  // Initialize from URL parameters on load
  useEffect(() => {
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    if (category) {
      onCategorySelect(category);
    }

    if (query) {
      setSearchQuery(query);
      onSearch(query);
    }
  }, []);

  // Update URL when filters change
  const updateUrlParams = (category: string, query: string) => {
    const params = new URLSearchParams();
    if (category && category !== "All Topics") params.set("category", category);
    if (query) params.set("q", query);

    const newUrl = `/blog${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(newUrl, { scroll: false });
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    updateUrlParams(selectedCategory, searchQuery);
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    updateUrlParams(category, searchQuery);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mb-10 flex items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search articles"
            className="pl-10 border-2 border-gray-200 py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="ml-4">
          <Button
            className="bg-invest hover:bg-invest-secondary text-white"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category === selectedCategory ? "default" : "outline"}
              className={
                category === selectedCategory ? "bg-invest text-white" : ""
              }
              size="sm"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
