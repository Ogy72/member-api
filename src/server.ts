import { app } from "./app";
// import { connectMongo } from "./infrastructure/database/mongo";
import { connectMongo } from "./infrastructure/database/mongo.connection";
import { env } from "./config/env";

const start = async () => {
    await connectMongo();

    app.listen(env.PORT, () => {
        console.log(`Server started on ${env.PORT}`);
    });
}

start()