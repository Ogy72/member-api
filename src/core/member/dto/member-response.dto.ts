import { Member } from "../domain/member.entity";

export type MemberResponseDto = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

export const toMemberResponse = (member: Member): MemberResponseDto => ({
    id: member.id,
    name: member.name,
    email: member.email,
    createdAt: member.createdAt,
});