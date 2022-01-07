export type PostType = {
  id: number;
  creator: string;
  date: string;
  body: string;
  comments?: CommentType[];
  activity?: PostActivityType;
}

export type PostActivityType = {
  id: number;
  teacher: string;
  title: string;
}

export type CommentType = {
  id: number;
  creator: string;
  date: string;
  body: string;
}