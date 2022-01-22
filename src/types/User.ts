export type User = {
  id: number;
  name: string;
  email: string;
  role: number;
  avatar_path: string | null;
}

export type UserStatusGamification = {
  user_id?: number;
  coins: number;
}