import { connectMongoClient } from "./mongo.client";
import { env } from "../../config/env";

export const mongoConnectionFactory = async (
    primaryUri: string,
    dbName: string,
    fallbackUri?: string,
) => {
    try {
        await connectMongoClient(primaryUri, "Cloud", dbName);
        return "Cloud";
    } catch (primaryError) {
        console.error("Cloud MongoDB connection failed: ");
        console.error(primaryError);


        if (!env.MONGO_FALLBACK_ENABLED) {
            console.error("MongoDB fallback is disabled");
            throw primaryError;
        }

        if (!fallbackUri) {
            throw primaryError;
        }

        await connectMongoClient(fallbackUri, "Local", dbName);
        return "Local";
    }

};