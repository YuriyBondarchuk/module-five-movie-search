export enum MovieApiEndpoints {
    movies = '/movies',
    trending = '/trending',
    search = '/search',
    credits = '/credits',
    reviews = './reviews',
    genres = '/genre/movie/list',
    discoverMovie = '/discover/movie',
    collection = '/collection/',

    movieDetails = '/movie/',
    searchMovies = '/search/movie',

    trendingMovies = '/trending/movie',
    trendingMoviesByDay = '/trending/movie/day',
    trendingMoviesByWeek = '/trending/movie/week',

    configuration = 'configuration',
    configurationCountries = 'configuration/countries',
    configurationLanguages = 'configuration/languages',
    configurationPrimaryTranslations = 'configuration/primary_translations',
}

export enum TrendingType {
    day = 'day',
    week = 'week',
    all = 'all'
}