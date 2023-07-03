import axios, { AxiosInstance } from "axios";

const createInterceptor = (url: string): AxiosInstance => {
    return axios.create({
        baseURL: url,
    });
};

export const initApiInterceptor = (url: string): AxiosInstance => {
    return createInterceptor(url);
};
