import express, { Request, Response } from "express";
import pingHandler from "./functions/ping";
import pongHandler from "./functions/pong";

const app = express();

const adaptHandler =
    (handler: typeof pingHandler) => async (req: Request, res: Response) => {
        try {
            const result = await handler({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
            });
            res.status(result.status).send(result.body);
        } catch (error) {
            res.status(500).send({
                error: "Internal Server Error",
                details: (error as Error).message,
            });
        }
    };

// Routes
app.use("/ping", adaptHandler(pingHandler));
app.use("/pong", adaptHandler(pongHandler));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

export { app, pingHandler as ping, pongHandler as pong };

export default app;
