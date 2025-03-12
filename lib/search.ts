
"use client";

import { useEffect, useState } from "react";

// Define the interface for search result items
export interface SearchResult {
  title: string;
  content: string;
  url: string;
  type: 'project' | 'page';
  tags?: string[];
  image?: string;
}

// Load search index from the public JSON file
export async function fetchSearchIndex(): Promise<SearchResult[]> {
  try {
    const response = await fetch('/search-index.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch search index: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading search index:', error);
    return [];
  }
}

// Search function to filter results based on query
export function searchContent(query: string, searchIndex: SearchResult[]): SearchResult[] {
  if (!query.trim() || !searchIndex || searchIndex.length === 0) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  return searchIndex.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
    const contentMatch = item.content.toLowerCase().includes(normalizedQuery);
    const tagMatch = item.tags?.some(tag => 
      tag.toLowerCase().includes(normalizedQuery)
    );
    
    return titleMatch || contentMatch || tagMatch;
  });
}

// Custom hook to use the search functionality
export function useSearch() {
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadSearchIndex() {
      setIsLoading(true);
      try {
        const index = await fetchSearchIndex();
        setSearchIndex(index);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load search index'));
      } finally {
        setIsLoading(false);
      }
    }

    loadSearchIndex();
  }, []);

  return {
    searchIndex,
    isLoading,
    error,
    search: (query: string) => searchContent(query, searchIndex)
  };
}
