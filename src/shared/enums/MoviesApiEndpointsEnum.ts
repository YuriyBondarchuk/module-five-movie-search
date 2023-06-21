export enum MovieApiEndpoints {
    movies = '/movies',
    trending = '/trending',
    search = '/search',
    credits = '/credits',
    reviews = './reviews',

    movieDetails = '/movie/',

    searchMovies = '/search/search-movies',

    trendingMovies = '/trending/movie',
    trendingMoviesByDay = '/trending/movie/day',
    trendingMoviesByWeek = '/trending/movie/week',
}

export enum TrendingType {
    day = 'day',
    week = 'week'
}