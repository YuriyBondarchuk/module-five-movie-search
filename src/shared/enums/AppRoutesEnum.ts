export enum AppRouteMap {
    home = '/',
    movies = '/movies',
    movieDetails = ':movieId',
    movieCast = 'cast',
    movieReviews = 'reviews',
    
    auth = '/auth',
    login = 'login',
    logout = 'logout',

    notFound = '*'
}