import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchReviews } from '../api';

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const ReviewCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews();
      setReviews(data);
    };
    getReviews();
  }, []);

  return (
    <ReviewsWrapper>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <h4>{review.author}</h4>
          <p>"{review.content}"</p>
        </ReviewCard>
      ))}
    </ReviewsWrapper>
  );
}

export default Reviews;
