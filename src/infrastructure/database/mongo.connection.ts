import { mongoConnectionFactory } from "./mongo.factory";
import { env } from "../../config/env";

export const connectMongo = async () => {
    const used = await mongoConnectionFactory(
        env.MONGODB_CLOUD_URI,
        env.DB_NAME,
        env.MONGODB_URI
    );
    console.log(`MongoDb Source: ${used.toUpperCase()}`);
}
