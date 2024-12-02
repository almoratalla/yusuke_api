// Unified request typing
export interface PlatformRequest {
    body?: any;
    query?: Record<string, string | undefined | unknown>;
    params?: Record<string, string | undefined>;
    headers?: Record<string, string | undefined | unknown>;
    [key: string]: any; // Allow platform-specific fields
}

// Unified response typing
export interface PlatformResponse {
    status: number;
    body: any;
}

// Unified handler typing
export type UnifiedHandler = (
    req: PlatformRequest
) => Promise<PlatformResponse>;
