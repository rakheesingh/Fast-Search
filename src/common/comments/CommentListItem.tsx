import { TextBase, TextSM } from "../../designSystem/typography/Typography";
import { truncateBody } from "../../helper";
import { CommentEntity } from "../../types/comment";

interface CommentListItemProps {
  comment: CommentEntity;
}

export default function CommentListItem({ comment } : CommentListItemProps) {
  return (
    <div
      key={comment.id}
      className="border border-gray-300 rounded-lg py-4 px-6"
    >
      <div className="flex justify-between items-center">
        <TextBase textColor="text-gray-900" className="text-lg font-semibold">
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
  );
}
