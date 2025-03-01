import { CommentEntity } from "../../types/comment";
import { SearchCriteria } from "../../types/searchCriteria";

export function createSearchSuggestionsFromSearchResult(
  searchQuery: string,
  searchResult: Array<CommentEntity>
) {
  const suggestions = searchResult.map((suggestion: CommentEntity) => {
    const words = suggestion.name.split(" ");
    // Find the index of the word that includes the search query (case-insensitive)
    const matchIndex = words.findIndex((word) =>
      word.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // If there's no match, default to starting at index 0
    const startIndex = matchIndex !== -1 ? matchIndex : 0;
    return words.slice(startIndex, startIndex + 2).join(" ");
  });
  const uniqueSuggestions = Array.from(new Set(suggestions));
  return uniqueSuggestions.splice(0, 5);
}

export function createPromiseArray(searchAPIsByCriteria:Array<SearchCriteria>, searchQuery:string) {
  const promises = searchAPIsByCriteria.map(async (criteria) => {
    try {
      const response = await fetch(
        `${criteria.api}?${criteria.query}=${searchQuery}&_limit=20`
      );
      const searchResult = await response.json();
      return {
        key: criteria.name,
        suggestions: createSearchSuggestionsFromSearchResult(
          searchQuery,
          searchResult
        ),
      };
    } catch (error) {
      console.error(`API for ${criteria.query} failed:`, error);
      return { key: criteria.query, suggestions: [] };
    }
  });

  return promises;
}
