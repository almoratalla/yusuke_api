import { FunctionHandler } from "../../types/handler";

export const pingHandler: FunctionHandler = async (req) => {
    return {
        status: 200,
        body: { message: "Pong!" },
    };
};

export default pingHandler;
