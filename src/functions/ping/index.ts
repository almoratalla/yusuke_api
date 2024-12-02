import { UnifiedHandler } from "../../types/platform";

export const pingHandler: UnifiedHandler = async (req) => {
    return {
        status: 200,
        body: { message: "Pong!" },
    };
};

export default pingHandler;
