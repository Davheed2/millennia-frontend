"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

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
  searchQuery,
}: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(searchQuery || "");
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState(selectedCategory);

  useEffect(() => {
    const categoryFromURL = searchParams.get("category") || "All Topics";
    const queryFromURL = searchParams.get("q") || "";

    setInputValue(queryFromURL);
    setLocalSelectedCategory(categoryFromURL);
    onSearch(queryFromURL);
    onCategorySelect(categoryFromURL);
  }, [searchParams, onSearch, onCategorySelect]);

  useEffect(() => {
    setInputValue(searchQuery);
    setLocalSelectedCategory(selectedCategory);

    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All Topics") {
      params.set("category", selectedCategory);
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }

    const newUrl = `/blog${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(newUrl, { scroll: false });
  }, [router, searchQuery, selectedCategory]);

  const handleSearch = () => {
    onSearch(inputValue);
    onCategorySelect(localSelectedCategory);

    const params = new URLSearchParams();
    if (localSelectedCategory && localSelectedCategory !== "All Topics") {
      params.set("category", localSelectedCategory);
    }
    if (inputValue) {
      params.set("q", inputValue);
    }

    const newUrl = `/blog${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(newUrl, { scroll: false });
  };

  const handleCategoryClick = (category: string) => {
    setLocalSelectedCategory(category);
    handleSearch(); // Ensure search is triggered immediately
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mb-10 flex items-center">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search articles"
            className="pl-10 border-2 border-gray-200 py-6"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
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
              variant={
                category === localSelectedCategory ? "default" : "outline"
              }
              className={
                category === localSelectedCategory ? "bg-invest text-white" : ""
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
