export type PostType = {
  id: number;
  creator: string;
  date: string;
  body: string;
  name?: string;
  comments?: CommentType[];
  activity?: PostActivityType;
}

export type PostActivityType = {
  id: number;
}

export type CommentType = {
  id: number;
  creator: string;
  date: string;
  body: string;
}