import React from 'react';

const ListReviews = props => {
  const { reviews } = props;
  return (
    <div>
      <h1>Reviews:</h1>
      {reviews &&
        reviews.map(review => {
          return (
            <li key={review.id}>
              <h2>Stars: {review.star}</h2>
              {review.content}
            </li>
          );
        })}
    </div>
  );
};

export default ListReviews;
