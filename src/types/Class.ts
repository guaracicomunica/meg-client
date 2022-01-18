import { PostType } from "./Post"

export type ClassCard = {
  id: number;
  name: string;
  nickname: string;
  banner: string | null;
  code: string;
  status: number;
  partners?: string[];
  skills: Skill[];
  levels: Level[];
  teacher: string;
  roleUser?: number;
}

export type ClassType = {
  id: number;
  name: string;
  nickname: string;
  banner: string | null;
  code: string;
  roleUser: number;
  teacher: string;
  posts: PostType[],
}

export type DraftDataForm = {
  id: number;
  name: string;
  nickname: string;
  partners?: string[];
  skills?: SkillForm[];
  levels: LevelForm[];
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

export type DataFormTopic = 
{
  name: string,
  classroom_id: number
}

export type Skill = {
  name: string;
  coins: number;
  file: File;
}

export type SkillForm = {
  name: string;
  coins: number;
  file?: string;
}

export type Level = {
  name: string;
  xp: number;
  file: File;
}

export type LevelForm = {
  name: string;
  xp: number;
  path?: string;
}