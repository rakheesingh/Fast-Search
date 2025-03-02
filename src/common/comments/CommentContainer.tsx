import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import { CommentEntity } from "../../utils/types/comment";
import ErrorComponent from "../errorScreen/ErrorWithMessage";
import { ERROR, limit, NO_DATA } from "./utils/constant";
import { fetchComment } from "./utils/netwrok";

interface CommentContainerProps {
  query: string;
}


export default function CommentContainer({
  query = "",
}: CommentContainerProps) {
  const [comments, setComments] = useState<
    CommentEntity[] | typeof ERROR | typeof NO_DATA
  >([]);

  useEffect(() => {
    const getCommentData = async () => {
      try {
        const comments = await fetchComment(query, limit);
        if (comments.length === 0) {
          setComments(NO_DATA);
        } else setComments(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments(ERROR);
      }
    };
    getCommentData();
  }, [query]);

  // Use a type guard to check if comments is not an array
  if (!Array.isArray(comments)) {
    let message = "";
    if (comments === ERROR) {
      message = ERROR;
    } else if (comments === NO_DATA) {
      message = NO_DATA;
    }
    return <ErrorComponent message={message} />;
  }

  // At this point, TypeScript knows that comments is CommentEntity[]
  return (
    <div data-testid="comment-list ">
      <CommentList comments={comments} />
    </div>
  );
}
