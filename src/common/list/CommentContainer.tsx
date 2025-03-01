import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import { CommentEntity } from "../../types/comment";
import ErrorComponent from "../errorScreen/ErrorWithMessage";

interface CommentContainerProps {
  query: string;
}

export const ERROR: string = "Something went wrong with error state"
export const NO_DATA: string = "There is no data that exists for these search results";

export default function CommentContainer({
  query = "",
}: CommentContainerProps) {
  const [comments, setComments] = useState<CommentEntity[] | typeof ERROR | typeof NO_DATA>([]);

  useEffect(() => {
    const getCommentData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?q=${query}`
        );
        const dataJson = await response.json();
        // Optionally, you might want to check if dataJson is empty and then set NO_DATA
        if(dataJson.length === 0) {
            setComments(NO_DATA);
        }
        else setComments(dataJson);
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
      message = ERROR
    } else if (comments === NO_DATA) {
      message = NO_DATA
    }
    return <ErrorComponent message={message} />;
  }

  // At this point, TypeScript knows that comments is CommentEntity[]
  return (
    <div data-testid="comment-list">
      <CommentList comments={comments} />
    </div>
  );
}
