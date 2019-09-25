import React from 'react';
import { Rating, Image, Header } from 'semantic-ui-react';

const ListReviews = props => {
  const { oldReviews, newReviews } = props;
  return (
    <div style={{ marginBottom: 60 }}>
      <Header as="h1"> Past Reviews:</Header>
      <div>
        {oldReviews === undefined || oldReviews.length === 0 ? (
          <div>No review available for this product.</div>
        ) : (
          oldReviews.map(review => {
            return (
              <li key={review.id}>
                <div>{review.userName}</div>
                <div>
                  <Image src={review.imageUrl} size="tiny" />
                </div>
                <h2>
                  Stars:{' '}
                  <Rating
                    icon="star"
                    defaultRating={review.star}
                    maxRating={5}
                    size="huge"
                    disabled
                  />
                </h2>
                {review.content}
              </li>
            );
          })
        )}
      </div>
      {newReviews &&
        newReviews.map(review => {
          return (
            <li key={review.id}>
              <h2>
                Stars:{' '}
                <Rating
                  icon="star"
                  defaultRating={review.star}
                  maxRating={5}
                  size="huge"
                  disabled
                />
              </h2>
              {review.content}
            </li>
          );
        })}
    </div>
  );
};

export default ListReviews;
