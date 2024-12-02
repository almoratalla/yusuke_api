import { HttpFunction } from "@google-cloud/functions-framework";
import { UnifiedHandler, PlatformRequest } from "../types/platform";

export const adaptFunctionsFrameworkHandler = (
    handler: UnifiedHandler
): HttpFunction => {
    return async (req, res) => {
        try {
            const unifiedReq: PlatformRequest = {
                // body: req.body,
                // query: req.query,
                // params: req.params,
                // headers: req.headers,
                ...req,
            };

            const result = await handler(unifiedReq);

            res.status(result.status).send(result.body);
        } catch (error) {
            res.status(500).send({
                error: "Internal Server Error",
                details: (error as Error).message,
            });
        }
    };
};
