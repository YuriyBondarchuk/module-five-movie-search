import { AxiosError, AxiosResponse } from "axios";
import { ErrorHttpResponse, SuccessHttpResponse } from "../../interfaces";

export const setResponseData = (response: AxiosResponse<any, any>): SuccessHttpResponse | ErrorHttpResponse => {
    if (response instanceof AxiosError) {
        return {
            message: response.message,
            status: {
                code: response?.response?.status,
                message: response?.response?.data.status_message
            }
        }
    }

    if (response && response.data && response.status === 200) {
        return {
            data: response.data,
            status: response.status
        }
    }

    return {
        message: 'Something is wrong. Please try again later'
    }
}