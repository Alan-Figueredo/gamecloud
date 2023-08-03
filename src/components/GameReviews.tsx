import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
export const GameReviews = (props: { reviewQuantity: any; gameReview: any; }) => {
    interface Review {
        recommendationid: string | undefined;
        review: string | undefined;
        voted_up: number | undefined;
        votes_up: number | undefined;
        votes_funny: number | undefined;
    }
    const reviewQuantity = props.reviewQuantity;
    const [reviewParameter, setReviewParameter] = useState(500)
    const gameReview = props.gameReview;
    return (
        <div className="col-lg-8 col-12">
            <h2>REVIEWS</h2>
            <hr style={{ color: "white" }} />
            {gameReview && gameReview?.reviews?.slice(1, reviewQuantity).map((review: Review) => {
                return (
                    <div key={review.recommendationid}>
                        <Row className="my-3">
                            <Col lg={7} >
                                <p>"{review?.review?.slice(0, reviewParameter)}{review?.review?.length !== undefined && review?.review?.length > 500 ? "..." : ""}" {review?.review?.length !== undefined && review?.review?.length > 500 ? <p style={{ cursor: "pointer" }} onClick={() => { setReviewParameter(-1) }}>see more</p> : ""}</p>
                            </Col>
                            <Col>
                                {review.voted_up ? <><FiThumbsUp className="thumbReview" /> <p className="mt-2">Recommended</p></> : <><FiThumbsDown className="thumbReview" /> <p className="mt-2">Not Recommended</p></>}
                            </Col>
                            <Col>
                                <p>{review.votes_up ? "people found this review helpful" : ""}</p>
                                <p>{review.votes_funny && review?.votes_funny < 0 ? "people found this review funny" : ""}</p>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </div>

    )
}