import { useContext } from "react";
import { TextBase, TextSM } from "../../designSystem/typography/Typography";
import { InputContext } from "./Search";
import { useClickOutside } from "../../hooks/useClickOutside";
import { isEmpty } from "../../helper";
import SuggestionItem from "./SuggestionItem";

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

  if (!open || isEmpty(suggestionWithCategory)) {
    return null;
  }

  return (
    <div
      className="bg-white border border-gray-300 rounded-lg shadow-lg mx-3 w-full max-w-lg suggestion-list absolute left-0 top-full z-[1000] p-3"
      data-testid="suggestion-list"
    >
      {Object.keys(suggestionWithCategory).map(
        (suggestionCriteria, categoryIndex) => (
          <div key={categoryIndex} className="py-1">
            <TextBase textColor="text-gray-900" className="mb-2 font-semibold flex items-center">
              Showing suggestions based on:
              <TextSM textColor="text-red-500" className="ml-1">
                {suggestionCriteria}
              </TextSM>
            </TextBase>
            <ul className="space-y-1" role="listbox">
              {suggestionWithCategory[suggestionCriteria].map(
                (suggestion: string, index: number) => (
                  <li key={index} className="hover:bg-gray-100 rounded-md p-1 cursor-pointer">
                    <SuggestionItem
                      suggestion={suggestion}
                      clickSuggestion={() => selectSuggestion(suggestion)}
                    />
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
