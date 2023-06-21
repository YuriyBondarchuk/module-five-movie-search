export type SuccessHttpResponse =  {
    data: any,
    status: number
}

export interface ErrorHttpResponse {
    message: string;
    status?: {
        code: number | undefined;
        message: string | undefined;
    };
}