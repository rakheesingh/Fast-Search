import { createContext, useState } from "react";
import SearchInput from "./SearchInput";
import SearchSuggestion from "./SearchSuggestion";
import { SearchCriteria } from "../../utils/types/searchCriteria";
import { InputContextProps } from "../../utils/types/input";
import { createPromiseArray } from "./utils/netwrok";

interface SearchProps {
  handleSearch: (search: string) => void;
  searchAPIsByCriteria: Array<SearchCriteria>;
}

export function Search({ handleSearch, searchAPIsByCriteria }: SearchProps) {
  const [searchSuggestionsByCategory, setSearchSuggestionsByCategory] =
    useState({});
  const [openSuggestionDropdown, setOpenSuggestionDropdown] = useState(false);

  const populateSearchSuggestions = async (searchQuery: string) => {
    if(searchQuery === "") {
        return;
    }
    const searchSuggestionByQuery: { [key: string]: unknown } = {};
    // Create an array of promises for each API call and processing
    const promises = createPromiseArray(searchAPIsByCriteria, searchQuery);
    // Wait for all promises to settle
    const results = await Promise.all(promises);
    results.forEach(({ key, suggestions }) => {
      searchSuggestionByQuery[key] = suggestions;
    });
    setSearchSuggestionsByCategory(searchSuggestionByQuery);
    setOpenSuggestionDropdown(true);
  };

  const closeSuggestionList = () => {
    setOpenSuggestionDropdown(false);
  }

  const clearQuery = (searchQuery: string) => {
    clearSuggestions();
    handleSearch(searchQuery);
  }

  const clearSuggestions = () => {
    setSearchSuggestionsByCategory({});
    closeSuggestionList();
  }
  
  const performSearch = (query: string) => {
    handleSearch(query);
    clearSuggestions();
  }

  return (
    <div className="relative">
      <SearchInput
        performSearch={performSearch}
        populateSearchSuggestions={populateSearchSuggestions}
        clearQuery={clearQuery}
      />
      <SearchSuggestion
        open={openSuggestionDropdown}
        closeSuggestionList={closeSuggestionList}
        suggestionWithCategory={searchSuggestionsByCategory}
        performSearch={performSearch}
      />
    </div>
  );
}

export const InputContext = createContext<InputContextProps>({
  searchInputQuery: "",
  setSearchInputQuery: () => {},
});

export default function SearchContainer(props: SearchProps) {
  const [searchInputQuery, setSearchInputQuery] = useState("");
  return (
    <InputContext value={{ searchInputQuery, setSearchInputQuery }}>
      <Search {...props} />
    </InputContext>
  );
}
