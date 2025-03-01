import { useContext } from "react";
import { TextLarge } from "../../designSystem/typography/Typography";
import { InputContext } from "./Search";
import { useClickOutside } from "../../hooks/useClickOutside";

interface SuggestionListProps {
  suggestionWithCategory: Record<string, Array<string>>;
  open: boolean;
  closeSuggestionList: () => void;
  performSearch: (query: string) => void; // to control the visibility of the dropdown
}

export default function SearchSuggestion({
  suggestionWithCategory,
  open,
  closeSuggestionList,
  performSearch,
}: SuggestionListProps) {
  const { setSearchInputQuery } = useContext(InputContext);
  useClickOutside(closeSuggestionList, open, ".suggestion-list");

  const selectSuggestion = (suggestion: string) => {
    setSearchInputQuery(suggestion);
    performSearch(suggestion);
    closeSuggestionList();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-md shadow-md mx-3 w-full max-w-lg suggestion-list absolute left-0 top-full z-[1000]"
      data-testid="suggestion-list"
    >
      {Object.keys(suggestionWithCategory).map(
        (suggestionCriteria, categoryIndex) => (
          <div
            key={categoryIndex}
            className="py-3 px-4 border-b last:border-b-0 bg-bran"
          >
            <TextLarge textColor="text-gray-800" className="mb-2">
              {suggestionCriteria}
            </TextLarge>
            <ul className="space-y-1" role="listbox">
              {suggestionWithCategory[suggestionCriteria].map(
                (suggestion: string, index: number) => (
                  <li
                    role="option"
                    key={index}
                    className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          </div>
        )
      )}
    </div>
  );
}
