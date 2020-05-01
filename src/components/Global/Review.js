import React from 'react';
import Stars from './Stars';

const Review = (props) => {
    return (
        <div className="review">
            <div className="review__image-container">
                <img src={props.review.image} alt="woman" className="review__image" />
            </div>
            <div className="review__content-container">
                <h3 className="review__name">
                    {props.review.first_name} {props.review.last_name}
                    <Stars stars={props.review.stars} />
                </h3>
                <p className="review__description">
                    "{props.review.description}"
                </p>
            </div>
        </div>
    );
}

export default Review;