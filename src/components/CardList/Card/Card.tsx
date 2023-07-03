import { NavigateFunction, useNavigate } from "react-router-dom";
import { getImg } from "../../../shared/services";
import "./Card.scss";
import { AppRouteMap, PosterSize } from "../../../shared/enums";
import LazyImage from "../../LazyImage/LazyImage";
import { ShortMovie } from "../../../shared/interfaces";
const movieImg = require('./../../../images/no-found.jpg')

function Card({ movie }: { movie: ShortMovie }) {
    const navigate: NavigateFunction = useNavigate();

    const toMoviedetails = () => {
        navigate(AppRouteMap.movies + "/" + movie.id, { replace: true, state: {from: AppRouteMap.movies}});
    };

    const setVoidAverage = (): number => {
        return Math.ceil(movie.vote_average);
    }

    return (
        <div onClick={() => toMoviedetails()} className="movie-card">
            <div className="movie-card-vote">vote: {setVoidAverage()}</div>
            {movie.adult && <div className="movie-card-adult">+18</div>}
            <div className="movie-card-post">
                <LazyImage path={getImg(movie.poster_path, PosterSize.w154)} replace={movieImg}/>
            </div>
            <div className="movie-card-info">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-date">{movie.release_date}</p>
            </div>
        </div>
    );
}

export default Card;