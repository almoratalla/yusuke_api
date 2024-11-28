import { FunctionHandler } from "../../types/handler";

export const pongHandler: FunctionHandler = async (req) => {
    return {
        status: 200,
        body: { message: "Ping!" },
    };
};

export default pongHandler;
