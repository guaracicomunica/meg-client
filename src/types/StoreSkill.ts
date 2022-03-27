export type SkillNotificationType = {
  id: number;
  skill: string;
  classroom: string;
  claimer: {
    name: string,
    avatar: string,
  };
  createdAt: string;
};

export type SkillClaimedType = {
  id: number;
  name: string;
  claimed: number;
}

export type SkillStoreClasses = {
  id: number;
  name: string;
  nickname: string;
  banner?: string,
  teacher: string;
}

export type SkillToBuy = {
  id: number;
  name: string;
  coins: number;
  path?: string;
  classroomId: number;
}