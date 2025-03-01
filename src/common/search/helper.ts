/* eslint-disable @typescript-eslint/no-explicit-any */

export function createSearchSuggestionsFromSearchResult<T extends object>(
  searchQuery: string,
  searchResults: Array<T>,
  criteria: any
) {
   // Normalize the search query for case-insensitive matching
   const normalizedQuery = searchQuery.toLowerCase();

   const suggestions = searchResults.map((item: any) => {
     // Convert the field value to string and normalize for case-insensitive search
     const text = String(item[criteria]);
     const normalizedText = text.toLowerCase();
 
     // Find the index of the search query in the normalized text
     const queryIndex = normalizedText.indexOf(normalizedQuery);
     if (queryIndex === -1) {
       return "";
     }
 
     // Set the start index at the beginning of the query
     const startIndex = queryIndex;
     // Initialize endIndex to the end of the found query
     let endIndex = queryIndex + searchQuery.length;
 
     // We want to capture two additional words after the query
     let wordsToCapture = 2;
     while (wordsToCapture > 0 && endIndex < text.length) {
       // If a space is found, consider it a word boundary
       if (text[endIndex] === " ") {
         wordsToCapture--;
       }
       endIndex++;
     }
 
     // Extract and return the substring with the query and the two extra words
     return text.substring(startIndex, endIndex).trim();
   })
   .filter((suggestion) => suggestion !== "");
 
   // Remove duplicate suggestions and limit the result to the first five items
   const uniqueSuggestions = Array.from(new Set(suggestions));
   return uniqueSuggestions.slice(0, 5);

}
