import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
    MONGODB_CLOUD_URI: process.env.MONGODB_CLOUD_URI!,
    MONGODB_URI: process.env.MONGODB_URI!,
    DB_NAME: process.env.DB_NAME || "test",
    MONGO_FALLBACK_ENABLED: process.env.MONGO_FALLBACK_ENABLED === "true",
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES: process.env.JWT_EXPIRES as string,
}