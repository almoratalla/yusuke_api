export interface HandlerRequest {
    body: any;
    query: Record<string, string | undefined | unknown>;
    params: Record<string, string | undefined>;
    headers: Record<string, string | undefined | unknown>;
}

export type HandlerResponse = {
    status: number;
    body: any;
};

export type FunctionHandler = (req: HandlerRequest) => Promise<HandlerResponse>;
