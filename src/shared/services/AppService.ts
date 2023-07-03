import axios from "axios";
import { GenreData, SuccessHttpResponse } from "../interfaces";
import { setLocalStorage } from "./LocalStorageService";
import {
    getConfigurations,
    getCountries,
    getLanguages,
    getMovieGenres,
    getTraslations,
} from "./MovieHttpService";
import { SortByEnum } from "../enums/FilterEnum";

export const getSortBy = (): Promise<{}[]> => {
    const sortObj = [
        {name: 'Популярність (по вбиванню)', type: SortByEnum.popularityAsc},
        {name: 'Популярність (по зростанню)', type: SortByEnum.popularityDesc},
        {name: 'Рейтинг (по вбиванню)', type: SortByEnum.voteCountAsc},
        {name: 'Рейтинг (по зростанню)', type: SortByEnum.voteAverageDesc},
        {name: 'Дата Випуску (по вбиванню)', type: SortByEnum.primaryReleaseDateAsc},
        {name: 'Дата Випуску(по зростанню)', type: SortByEnum.primaryReleaseDateDesc},
        {name: 'Назва (А-Я)', type: SortByEnum.revenueAsc},
        {name: 'Назва (Я-А)', type: SortByEnum.revenueDesc},
    ]
    // const sort: SortByEnum[] = [SortByEnum.popularityAsc, SortByEnum.popularityDesc];

    return new Promise((resolve) => resolve(sortObj));
}

export const loadGenres = () => {
    getMovieGenres()
        .then((data: SuccessHttpResponse<GenreData>) => {
            setLocalStorage("genres", data.data.genres);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log("Request get genres has been did");
        });
};

export const loadConfiguration = (): void => {
    axios
        .all([
            getConfigurations(),
            getCountries(),
            getLanguages(),
            getTraslations(),
            getMovieGenres(),
            getSortBy()
        ])
        .then(
            axios.spread((configuration, countries, languages, traslations, genres, sortBy) => {
                const formatObject = {
                    configuration: configuration.data,
                    countries: countries.data,
                    languages: languages.data,
                    traslations: traslations.data,
                    genres: genres.data,
                    sortBy
                }
                setLocalStorage('config', formatObject);
            })
        );
};
