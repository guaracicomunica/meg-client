export type PostType = {
  id: number;
  creatorPost: string;
  date: string;
  postBody: string;
  comments: CommentType[];
}

export type PostActivityType = {
  id: number;
  teacher: string;
  activityTitle: string;
}

export type CommentType = {
  id: number;
  commentCreator: string;
  date: string;
  commentBody: string;
}