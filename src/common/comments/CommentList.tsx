import { TextBase, TextSM } from "../../designSystem/typography/Typography";
import { CommentEntity } from "../../types/comment";

interface CommentListProps {
    comments: CommentEntity[];
  }

export default function CommentList({ comments }: CommentListProps) {
    // Utility function to truncate the body to a maximum length of 64 characters
    const truncateBody = (text: string, maxLength: number = 64): string => {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
  
    return (
      <div className="flex flex-col gap-6 w-full my-8">
        {comments.map((comment) => (
          <div key={comment.id} className="border border-blue-500 rounded-lg py-3 px-6" >
            <div className="flex justify-between">
              <TextBase textColor="text-slate-700">{comment.name}</TextBase>
              <TextSM textColor="text-blue-600">{comment.email}</TextSM>
            </div>

            <TextSM textColor="text-slate-500">{truncateBody(comment.body)}</TextSM>
          </div>
        ))}
      </div>
    );
  }