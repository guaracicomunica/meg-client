export type PostType = {
  id: number;
  creatorPost: string;
  date: string;
  postBody: string;
  comments: CommentType[];
}

export type CommentType = {
  id: number;
  commentCreator: string;
  date: string;
  commentBody: string;
}