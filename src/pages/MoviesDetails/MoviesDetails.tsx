import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./MoviesDetails.scss";
import { useEffect, useRef, useState } from "react";
import { formatTime, getImg, getMovieDetail, getMovieImages } from "../../shared/services";
import { ImagesResponse, Movie, SuccessHttpResponse } from "../../shared/interfaces";
import Container from "../../components/Container/Container";
import {
    AppRouteMap,
    ImageSize,
    LogoSize,
    PosterSize,
} from "../../shared/enums";
import Tabs from "../../components/Tabs/Tabs";
import LazyImage from "../../components/LazyImage/LazyImage";
import Gallery from "../../components/Gallery/Gallery";
const movieImg = require("./../../images/no-found.jpg");

function MoviesDetails() {
    const [movie, setMovie] = useState<Movie>();
    const { movieId } = useParams<string>();
    const prevMovieId = useRef<number>();
    const location = useLocation();
    const navigate = useNavigate();
    const [gallery, setGallery] = useState<ImagesResponse>();

    useEffect(() => {
        if (!movie || (movieId && +movieId !== prevMovieId.current)) {
            if (movieId) {
                getMovieDetail(+movieId).then(
                    (response: SuccessHttpResponse<Movie>) => {
                        setMovie(response.data);
                        prevMovieId.current = response.data.id;
                    }
                );

                getMovieImages(+movieId).then((response: SuccessHttpResponse<ImagesResponse>) => {
                    setGallery(response.data);
                })
            }
        }

    }, [movie, movieId]);

    const setBackground = (): { backgroundImage: string } => {
        return {
            backgroundImage: `url(${
                movie?.backdrop_path &&
                getImg(movie?.backdrop_path, ImageSize.w1280)
            })`,
        };
    };

    const activeTab = (tab: string) => {
        if (tab === "Cast") {
            navigate(AppRouteMap.movies + "/" + AppRouteMap.movieCast, {
                replace: true,
                state: {
                    from: AppRouteMap.movies + "/" + movieId,
                    data: { id: movieId },
                    movieInfo: movie,
                },
            });
        }

        if (tab === "Reviews") {
            navigate(AppRouteMap.movies + "/" + AppRouteMap.movieReviews, {
                replace: true,
                state: {
                    from: AppRouteMap.movies + "/" + movieId,
                    data: { id: movieId },
                    movieInfo: movie,
                },
            });
        }
    };

    const setTitle = () => {
        if (!movie?.title) {
            return;
        }
        return (
            <h1 className="movie-details-title">
                {movie?.title}
                {movie?.release_date && <span> ({movie?.release_date})</span>}
            </h1>
        );
    };

    const setAdult = () => {
        if (!movie?.adult) {
            return;
        }
        return <div className="movie-details-adult">+18</div>;
    };

    const setTigline = () => {
        if (!movie?.tagline) {
            return;
        }
        return (
            <div className="movie-details-block">
                <h3 className="movie-section-caption">Tagline</h3>
                <p className="movie-details-tagline">"{movie?.tagline}"</p>
            </div>
        );
    };

    const setDesc = () => {
        if (!movie?.overview) {
            return;
        }
        return (
            <div className="movie-details-block">
                <h3 className="movie-section-caption">Overview</h3>
                <p className="movie-details-overview">{movie?.overview}</p>
            </div>
        );
    };

    const productionsCompanies = () => {
        if (!movie?.production_companies) {
            return;
        }

        const companies: any = movie.production_companies;

        return (
            <div className="movie-details-block">
                <h3 className="movie-section-caption">
                    Компанії які працювали над фільмом
                </h3>
                <div className="movie-details-companies-list">
                    {companies.map(
                        (company: any) =>
                            company.logo_path && (
                                <div className="movie-details-companies">
                                    <LazyImage
                                        path={getImg(
                                            company.logo_path,
                                            LogoSize.w45
                                        )}
                                    />
                                </div>
                            )
                    )}
                </div>
            </div>
        );
    };

    const setGenres = () => {
        if (!movie?.genres) {
            return;
        }

        const genres = movie.genres;

        return (
            <div>
                {genres.map(
                    (genre: any, index: number): any =>
                        genre.name && (
                            <span className="movie-details-genres">
                                {genre.name}
                                {genres.length > index + 1 && <span>, </span>}
                            </span>
                        )
                )}
            </div>
        );
    };

    const getTime = () => {
        if(!movie?.runtime) {return;}
        return (
            <span> • {formatTime(movie.runtime)}</span>
        )
    }

    return (
        <div className="movie-details">
            <div className="movie-details-top" style={setBackground()}>
                <Container classAdd="movie-details-top-container">
                    <div className="movie-details-poster">
                        <LazyImage
                            path={
                                movie?.poster_path &&
                                getImg(movie?.poster_path, PosterSize.w342)
                            }
                            replace={movieImg}
                        />
                    </div>
                    <div className="movie-details-info">
                        {setTitle()}
                        {
                            <div className="movie-details-block movie-details-line">
                                {setGenres()}
                                {getTime()}
                            </div>
                        }
                        {setAdult()}
                        {setTigline()}
                        {setDesc()}
                        {productionsCompanies()}
                    </div>
                </Container>
            </div>
            <div className="movie-details-content">
                <Tabs tabs={["Cast", "Reviews"]} emitActiveTab={activeTab}>
                    <div className="tab"></div>
                    <div className="tab"></div>
                </Tabs>
                {/* <Gallery list={gallery && gallery?.backdrops} title="Галлерея"/> */}
            </div>
        </div>
    );
}

export default MoviesDetails;
