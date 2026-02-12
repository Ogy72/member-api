import { Schema, model } from 'mongoose';

const memberSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

export const MemberModel = model("Member", memberSchema);