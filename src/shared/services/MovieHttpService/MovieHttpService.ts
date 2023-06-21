import { AxiosInstance } from "axios";
import { initApiInterceptor } from "../HttpInterceptors/HttpInterceptor"
import { setResponseData } from "../HttpService/HttpService";
import { ErrorHttpResponse } from "../../interfaces";
import { toast } from "react-toastify";
import { MovieApiEndpoints, TrendingType } from "../../enums";

const getMovieApiUrl = (): string => {
    return process.env.REACT_APP_API_URL ?? '';
}

const getMovieApiKeyAccess = (): string => {
    return 'Bearer ' + process.env.REACT_APP_API_KEY_ACCESS;
}

const movieApi: AxiosInstance = initApiInterceptor(getMovieApiUrl());

movieApi.defaults.headers.common['Authorization'] = getMovieApiKeyAccess();
movieApi.defaults.headers.common['accept'] = 'application/json';

movieApi.interceptors.response.use((e: any): any=> {
    return setResponseData(e)
  }, 
  error => {
    const errorObj = setResponseData(error) as ErrorHttpResponse;

    toast(errorObj.status?.message);

    return errorObj
  }
)

export const getMogiesTrending = <T>(type: TrendingType): Promise<any> => {
    let url: string;

    switch(type) {
        case TrendingType.day: 
            url = MovieApiEndpoints.trendingMovies + '/' + TrendingType.day;
        break;
        case TrendingType.week: 
            url = MovieApiEndpoints.trendingMovies + '/' + TrendingType.week;
        break;
    }

    return movieApi<T>({url: url});
}

export const getMogieDetail = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.movieDetails + id});
}

export const getMogieCredits = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.movieDetails + id + MovieApiEndpoints.credits});
}

export const getMogieReviews = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.movieDetails + id + MovieApiEndpoints.reviews});
}