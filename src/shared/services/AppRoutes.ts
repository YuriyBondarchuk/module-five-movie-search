import { lazy } from "react";

export const DashboardLayer = lazy(() => import('../../pages/DashboardLayer/DashboardLayer'));
export const Home = lazy(() => import('../../pages/Home/Home'));

export const Movies = lazy(() => import('../../pages/Movies/Movies'));
export const MoviesList = lazy(() => import('../../pages/MoviesList/MoviesList'));
export const MovieDetails = lazy(() => import('../../pages/MoviesDetails/MoviesDetails'));
export const MovieDetailsCast = lazy(() => import('../../pages/MoviesDetailsCast/MoviesDetailsCast'));
export const MovieDetailsReviews = lazy(() => import('../../pages/MoviesDetailsReviews/MoviesDetailsReviews'));

export const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

export const Auth = lazy(() => import('../../auth/Auth/Auth'));
export const Login = lazy(() => import('../../auth/Login/Login'));
export const Logout = lazy(() => import('../../auth/Logout/Logout'));