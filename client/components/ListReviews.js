import React from 'react';

const ListReviews = props => {
  const { oldReviews, newReviews } = props;
  return (
    <div>
      <h1>Past Reviews:</h1>
      {oldReviews &&
        oldReviews.map(review => {
          return (
            <li key={review.id}>
              <h2>Stars: {review.star}</h2>
              {review.content}
            </li>
          );
        })}
      {newReviews &&
        newReviews.map(review => {
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
