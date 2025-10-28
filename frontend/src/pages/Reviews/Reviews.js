import React from 'react';
import styled from 'styled-components';

const ReviewsContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Reviews = () => {
  return (
    <ReviewsContainer>
      <h1>⭐ Mis Reviews</h1>
      <p>Tus reseñas y calificaciones de comercios en Tulum.</p>
    </ReviewsContainer>
  );
};

export default Reviews;