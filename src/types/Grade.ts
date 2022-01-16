export type Grade = {
    user: string,
    bim1: number | null,
    bim2: number | null,
    bim3: number | null,
    bim4: number | null,
};

export type StudentGrade = {
    classroom: string,
    level?: string,
    xp: number,
    coins: number,
    bim1: number | null,
    bim2: number | null,
    bim3: number | null,
    bim4: number | null,
};