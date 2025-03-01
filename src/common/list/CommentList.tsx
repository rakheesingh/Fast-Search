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
      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <div key={comment.id} className="border border-slate-700 rounded-md p-2" >
            <h3>{comment.name}</h3>
            <p style={{ fontStyle: "italic", color: "#555" }}>{comment.email}</p>
            <p>{truncateBody(comment.body)}</p>
          </div>
        ))}
      </div>
    );
  }