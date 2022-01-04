import { PostActivityType, PostType } from "./Post"

export type ClassCard = {
  id: number;
  name: string;
  nickname: string;
  banner: string | null;
  code: string;
  status: number;
  partners: string[];
  skills: Skill[];
  levels: Level[];
  teacher: string;
  roleUser: number;
}

export type ClassPage = {
  id: number;
  name: string;
  nickname: string;
  banner: string | null;
  code: string;
  roleUser: number;
  teacher: string;
  posts: PostType[],
  activities: PostActivityType[]
}

export type DraftDataForm = {
  id: number;
  name: string;
  nickname: string;
  partners?: string[];
  skills?: Skill[];
  levels: Level[];
  file?: string;
}

export type DataFormClass = {
  name: string;
  nickname: string;
  partners?: string[];
  skills?: Skill[];
  levels: Level[];
  file?: File;
}

export type Skill = {
  name: string;
  coins: number;
}

export type Level = {
  name: string;
  xp: number;
}