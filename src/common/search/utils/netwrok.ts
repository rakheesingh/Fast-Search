import { SearchCriteria } from "../../../types/searchCriteria";
import { createSearchSuggestionsFromSearchResult } from "./helper";

export function createPromiseArray(
    searchAPIsByCriteria: Array<SearchCriteria>,
    searchQuery: string
  ) {
    const promises = searchAPIsByCriteria.map(async (criteria : SearchCriteria) => {
      try {
        const response = await fetch(
          `${criteria.api}?${criteria.query}=${searchQuery}&_limit=20`
        );
        const searchResult = await response.json();
        return {
          key: criteria.name,
          suggestions: createSearchSuggestionsFromSearchResult(
            searchQuery,
            searchResult,
            criteria.name
          ),
        };
      } catch (error) {
        console.error(`API for ${criteria.query} failed:`, error);
        return { key: criteria.query, suggestions: [] };
      }
    });
  
    return promises;
  }