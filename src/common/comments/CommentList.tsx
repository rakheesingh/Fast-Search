import { CommentListProps } from "../../types/comment";
import CommentListItem from "./CommentListItem";


export default function CommentList({ comments }: CommentListProps) {

  return (
    <div className="flex flex-col gap-6 w-full my-8">
      {comments.map((comment) => (
      <CommentListItem comment={comment}/>
      ))}
    </div>
  );
}
