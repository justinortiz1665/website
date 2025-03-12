
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchResult } from "@/lib/search";
import { useRouter } from "next/navigation";

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  query: string;
  onClose: () => void;
}

export default function SearchResults({ 
  results, 
  isVisible, 
  query, 
  onClose 
}: SearchResultsProps) {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);
  
  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isVisible) return;
      
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          event.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(results[selectedIndex].url);
            onClose();
          }
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
      }
    }
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, results, selectedIndex, router, onClose]);
  
  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={resultsRef}
      className="absolute top-full mt-1 w-full max-w-md bg-white rounded-md shadow-lg border border-gray-200 max-h-[80vh] overflow-y-auto z-50"
    >
      {query.trim() !== "" && results.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">
          No results found for "{query}"
        </div>
      ) : query.trim() === "" ? (
        <div className="p-4 text-sm text-gray-500">
          Enter a search term
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {results.map((result, index) => (
            <li 
              key={result.url}
              className={`p-3 hover:bg-gray-50 transition-colors ${
                index === selectedIndex ? "bg-gray-50" : ""
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <Link 
                href={result.url} 
                onClick={onClose}
                className="block"
              >
                <div className="flex items-center">
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900">
                      {result.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {result.content}
                    </p>
                    {result.tags && result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-1.5 py-0.5 text-xs bg-gray-100 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    {result.type === 'project' ? 'Project' : 'Page'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
