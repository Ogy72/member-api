import express from "express";
import memberRoute from "./presentation/routes/member.route";
import authRoute from "./presentation/routes/auth.route";
import { errorMiddleware } from "./presentation/middlewares/errror.middleware";
import { httpLogger } from "./presentation/middlewares/logger.middleware";

export const app = express();

app.use(httpLogger);
app.use(express.json());

app.use('/auth', authRoute);
app.use("/members", memberRoute);

// Error Handler
app.use(errorMiddleware);