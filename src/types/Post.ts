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
  is_private?: boolean;
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
  attachments?: AttachmentType[]
}

export type ActivityTopicType = {
  id: number;
  name: string;
}

export type AttachmentType = {
  path: string;  
}