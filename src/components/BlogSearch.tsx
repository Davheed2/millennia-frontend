"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface BlogSearchProps {
  categories: string[];
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  searchQuery: string;
  isLoading?: boolean; // Optional loading prop
}

export default function BlogSearch({
  categories,
  onSearch,
  onCategorySelect,
  selectedCategory,
  searchQuery,
  isLoading = false,
}: BlogSearchProps) {
  const [input, setInput] = useState(searchQuery);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(input);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search blog articles..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pl-10"
          disabled={isLoading} // optional
        />
      </div>

      <ScrollArea className="max-w-full overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-3">
          {["All Topics", ...categories].map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer px-4 py-1 text-sm rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-invest text-white"
                  : "bg-muted text-muted-foreground hover:bg-invest/10 hover:text-invest"
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
