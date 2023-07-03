import { ReviewData } from "../../shared/interfaces";
import "./Reviews.scss";

interface ReviewsProps {
    reviews: ReviewData;
}

function Reviews(props: ReviewsProps): JSX.Element {
    const { reviews } = props;

    return (
        <div className="review">
            <h3 className="review-title">
                Відгуки <span>{reviews.results.length}</span>
            </h3>
            {reviews.results.map((item) => (
                <div className="review-item">
                    <div className="review-top">
                        <div className="review-autor-info">
                            {/* <LazyImage path={getImg(item.url, ImageSize.original)} replace={personImg}/> */}
                            {/* <img src={item.author_details.avatar_path} alt="" /> */}
                            <p>
                                UserName: <span>{item.author}</span>
                            </p>
                            <p>
                                Rating:{" "}
                                <span>{item.author_details.rating}</span>
                            </p>
                        </div>

                        <div className="review-public-info">
                            <p>
                                Created: <span>{item.created_at}</span>
                            </p>
                            <p>
                                Updated: <span>{item.updated_at}</span>
                            </p>
                        </div>
                    </div>
                    <div className="review-bottom">
                        <p>{item.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Reviews;
