export type PostType = {
  id: number;
  creator: {
    name: string;
    avatar?: string;
  };
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
  creator: {
    name: string;
    avatar?: string;
  }
  date: string;
  is_private?: boolean;
  body: string;
  comments?: CommentType[];
  comment_id?: number;
}

export type ActivityType = {
  id: number;
  name: string;
  body: string;
  deadline?: string;
  points: number;
  xp: number;
  coins: number;
  disabled: boolean;
  comments?: CommentType[];
  topicId: number;
  postId: number;
  attachments?: AttachmentType[],
  totalAssignments?: number,
  totalDeliveredActivities?: number,
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

export type AttachmentType = {
  path: string;  
}