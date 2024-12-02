import { APIGatewayProxyHandler } from "aws-lambda";
import { UnifiedHandler, PlatformRequest } from "../types/platform";

export const adaptAwsLambdaHandler = (
    handler: UnifiedHandler
): APIGatewayProxyHandler => {
    return async (event, context) => {
        try {
            const unifiedReq: PlatformRequest = {
                query: event.queryStringParameters || {},
                params: event.pathParameters || {},
                ...event,
            };

            const result = await handler(unifiedReq);

            return {
                statusCode: result.status,
                body: JSON.stringify(result.body),
                headers: { "Content-Type": "application/json" },
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Internal Server Error",
                    details: (error as Error).message,
                }),
                headers: { "Content-Type": "application/json" },
            };
        }
    };
};
