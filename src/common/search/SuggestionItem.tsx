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
      className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-150"
      onClick={clickSuggestion}
    >
      {suggestion}
    </li>
  );
}
