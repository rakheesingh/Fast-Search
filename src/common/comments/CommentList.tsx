import { TextBase, TextSM } from "../../designSystem/typography/Typography";
import { CommentEntity } from "../../types/comment";

interface CommentListProps {
  comments: CommentEntity[];
}

export default function CommentList({ comments }: CommentListProps) {
  // Utility function to truncate the body to a maximum length of 64 characters
  const truncateBody = (text: string, maxLength: number = 64): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="flex flex-col gap-6 w-full my-8">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border border-gray-300 rounded-lg py-4 px-6"
        >
          <div className="flex justify-between items-center">
            <TextBase
              textColor="text-gray-900"
              className="text-lg font-semibold"
            >
              {comment.name}
            </TextBase>
            <TextSM textColor="text-gray-500" className="text-sm">
              {comment.email}
            </TextSM>
          </div>
          <TextSM textColor="text-gray-700" className="text-base mt-2">
            {truncateBody(comment.body)}
          </TextSM>
        </div>
      ))}
    </div>
  );
}
