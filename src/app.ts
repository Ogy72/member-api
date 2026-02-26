import express from "express";
import cors from "cors";
import { env } from "./config/env";
import apiRoutes from "./presentation/routes";
import { errorMiddleware } from "./presentation/middlewares/errror.middleware";
import { httpLogger } from "./presentation/middlewares/logger.middleware";
import cookieParser from "cookie-parser";

export const app = express();
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}));

app.use(httpLogger);
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', apiRoutes);

// Error Handler
app.use(errorMiddleware);