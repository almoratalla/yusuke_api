import express, { Request, Response } from "express";
import pingHandler from "./functions/ping";
import pongHandler from "./functions/pong";
import { adaptFunctionsFrameworkHandler } from "./adapters/functionsFramework";
import { adaptAwsLambdaHandler } from "./adapters/awsLambda";
import { UnifiedHandler } from "./types/platform";

const platformAdapters: Record<string, (handler: UnifiedHandler) => any> = {
    functionsFramework: adaptFunctionsFrameworkHandler,
    awsLambda: adaptAwsLambdaHandler,
};

const PLATFORM = process.env.PLATFORM || "functionsFramework";
const adaptHandler = platformAdapters[PLATFORM];

if (!adaptHandler) {
    throw new Error(`Unsupported platform: ${PLATFORM}`);
}

const app = express();

// Routes
app.use("/ping", adaptHandler(pingHandler));
app.use("/pong", adaptHandler(pongHandler));

const PORT = process.env.PORT || 3000;
if (!process.env.FUNCTIONS_EMULATOR && process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
}

export { app as index, pingHandler, pongHandler };

export default app;
