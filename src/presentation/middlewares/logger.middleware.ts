import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import { logger } from "../../shared/utils/logger";

export const httpLogger = pinoHttp({
    logger,

    genReqId: (req) => {
        const existing = req.headers["x-request-id"];

        if (typeof existing === 'string') {
            return existing;
        }

        return randomUUID();
    },

    customLogLevel: (req, res, err)=> {
        if (err || res.statusCode >= 500 || err) return 'error'
        if (res.statusCode >= 400) return 'warn'
        return 'info'
    }

});