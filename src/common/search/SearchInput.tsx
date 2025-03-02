import { useContext } from "react";
import Input from "../../designSystem/input/Input";
import Button from "../../designSystem/button/Button";
import { InputContext } from "./Search";
import { InputContextProps } from "../../types/input";
import useDebounce from "../../hooks/useDebounce";

const DEFAULT_INPUT_LIMIT = 3;
interface SearchInputProps<T = string> {
  performSearch: (search: string) => void;
  populateSearchSuggestions: (...args: [T]) => void | Promise<void>;
  clearQuery: (query: string) => void;
}

export default function SearchInput({
  performSearch,
  populateSearchSuggestions,
  clearQuery,
}: SearchInputProps) {
  const { searchInputQuery, setSearchInputQuery } =
    useContext<InputContextProps>(InputContext);
  const debouncedFunction = useDebounce(populateSearchSuggestions, 400);

  const handleInputChange = (value: string) => {
    if(value === "") clearQuery(value);
    setSearchInputQuery(value);
    if(value.length > DEFAULT_INPUT_LIMIT)
      debouncedFunction(value);
  };

  const fetchDataOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    performSearch(searchInputQuery);
  };

  return (
    <div className="flex gap-2 items-start w-full my-10">
        <Input
          placeholder="Search content on basis of name here..."
          value={searchInputQuery}
          onchange={handleInputChange}
          className="w-full"
          data-testid="textbox"
          role="textbox"
        />
      <Button
        variant="primary"
        className="rounded-lg"
        onClick={fetchDataOnSubmit}
        data-testid="submitButton"
      >
        Search
      </Button>
    </div>
  );
}
