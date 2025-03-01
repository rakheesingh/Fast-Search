import { useContext } from "react";
import Input from "../../designSystem/input/Input";
import Button from "../../designSystem/button/Button";
import { InputContext } from "./Search";
import { InputContextProps } from "../../types/input";
import useDebounce from "../../hooks/useDebounce";

interface SearchInputProps<T = string> {
  performSearch: (search: string) => void;
  populateSearchSuggestions: (...args: [T]) => void | Promise<void>;
}

export default function SearchInput({
  performSearch,
  populateSearchSuggestions,
}: SearchInputProps) {
  const { searchInputQuery, setSearchInputQuery } =
    useContext<InputContextProps>(InputContext);
  const debouncedFunction = useDebounce(populateSearchSuggestions, 400);

  const handleInputChange = (value: string) => {
    setSearchInputQuery(value);
    debouncedFunction(value);
  };

  const fetchData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    performSearch(searchInputQuery);
  };

  return (
    <div className="flex gap-2 items-start">
      <div className="w-full">
        <Input
          placeholder="Search content on basis of name here..."
          value={searchInputQuery}
          onchange={handleInputChange}
          className="w-full"
          data-testid="textbox"
          role="textbox"
        />
      </div>
      <Button
        variant="primary"
        className="rounded-lg"
        onClick={fetchData}
        data-testid="submitButton"
      >
        Search
      </Button>
    </div>
  );
}
