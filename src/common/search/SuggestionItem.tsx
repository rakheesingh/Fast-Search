interface SuggestionItemProps {
  suggestion: string;
  clickSuggestion: () => void;
}
export default function SuggestionItem({
  suggestion,
  clickSuggestion,
}: SuggestionItemProps) {
  return (
    <li
      role="option"
      className="hover:bg-gray-100 rounded-md p-1 cursor-pointer"
      onClick={clickSuggestion}
    >
      {suggestion}
    </li>
  );
}
