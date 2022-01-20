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
}