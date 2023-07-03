import { AxiosInstance } from "axios";
import { initApiInterceptor } from "./HttpInterceptor"
import { setResponseData } from "./HttpService";
import { ErrorHttpResponse } from "../interfaces";
import { toast } from "react-toastify";
import { MovieApiEndpoints, TrendingType } from "../enums";

export const getMovieApiUrl = (): string => {
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

export const getMoviesTrending = <T>(type: TrendingType, sort: {}): Promise<any> => {
    let url: string;
    let params: any = {};

    for (let key in sort) {
        let item: string = key;
        const sortData: any = sort;

        if(sortData[item]) {
            params[item] = sortData[item];
        }
    }

    movieApi.defaults.params = params;

    switch(type) {
        case TrendingType.day: 
            url = MovieApiEndpoints.trendingMovies + '/' + TrendingType.day;
        break;
        case TrendingType.week: 
            url = MovieApiEndpoints.trendingMovies + '/' + TrendingType.week;
        break;
        case TrendingType.all: 
            url = MovieApiEndpoints.discoverMovie
        break;
    }

    return movieApi<T>({url: url});
}

export const getMovieSearch = (query: string, sort: {}): Promise<any> => {
    movieApi.defaults.params = sort;
    return movieApi({url: MovieApiEndpoints.searchMovies + '?query=' + query });
}

export const getMovieCollection = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.collection + id});
}

export const getMovieDetail = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.movieDetails + id});
}

export const getMovieImages = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.movieDetails + id + '/images'});
}

export const getMovieCredits = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.movieDetails + id + MovieApiEndpoints.credits});
}

export const getMovieReviews = (id: number): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.movieDetails + id + MovieApiEndpoints.reviews});
}

export const getMovieGenres = (): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.genres});
}

export const getConfigurations = (): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.configuration});
}

export const getCountries = (): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.configurationCountries});
}

export const getLanguages = (): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.configurationLanguages});
}

export const getTraslations = (): Promise<any> => {
    return movieApi({url: MovieApiEndpoints.configurationPrimaryTranslations});
}