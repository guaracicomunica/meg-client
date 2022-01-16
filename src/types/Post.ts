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

export type ActivityType = {
  id: number;
  name: string;
  body: string;
  deadline?: string;
  points: number;
  xp: number;
  coins: number;
  comments?: CommentType[];
  topicId: number;
}

export type ActivityTopicType = {
  id: number;
  name: string;
}

export type ActivityStudent = {
  id: number;
  name: string;
  avatar: string | null;
  files: string[];
  points: number;
  delivery_at: string;
}