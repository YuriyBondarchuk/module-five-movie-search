import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import "./MoviesDetailsReviews.scss";
import { useLocation } from "react-router-dom";
import { getMovieReviews } from "../../shared/services";
import { ReviewData, SuccessHttpResponse } from "../../shared/interfaces";
import Reviews from "../../components/Reviews/Reviews";

function MoviesDetailsReviews() {
    const [reviews, setReviews] = useState<ReviewData>();

    const location = useLocation();
    const movieId: number = location.state.data.id;

    useEffect(() => {
        if(!reviews) {
            getMovieReviews(movieId).then((data: SuccessHttpResponse<ReviewData>) => setReviews(data.data));
        }
    });

    console.log(reviews)

    return (
        <Container>
            <div className="movie-review">
                <div className="movie-review-panel">
                    {reviews && <Reviews reviews={reviews} />}
                </div>
            </div>
        </Container>
    );
}

export default MoviesDetailsReviews;
