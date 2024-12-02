import { UnifiedHandler } from "../../types/platform";

export const pongHandler: UnifiedHandler = async (req) => {
    return {
        status: 200,
        body: { message: "Ping!" },
    };
};

export default pongHandler;
