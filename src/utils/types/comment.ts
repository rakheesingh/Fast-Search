export interface CommentEntity {
    id: number;
    postId: number;
    email: string;
    name: string;
    body: string;
}

export interface CommentListProps {
    comments: CommentEntity[];
  }
  