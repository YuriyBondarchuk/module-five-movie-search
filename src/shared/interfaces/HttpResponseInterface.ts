export interface SuccessHttpResponse<T> {
    data: T;
    status: number;
}

export interface ErrorHttpResponse {
    message: string;
    status?: {
        code: number | undefined;
        message: string | undefined;
    };
}