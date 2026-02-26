export interface Member {
    id: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
    createdAt: string;
}