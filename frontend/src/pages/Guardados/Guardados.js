import React from 'react';
import styled from 'styled-components';

const GuardadosContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Guardados = () => {
  return (
    <GuardadosContainer>
      <h1>📍 Lugares Guardados</h1>
      <p>Tus lugares favoritos y guardados en Tulum.</p>
    </GuardadosContainer>
  );
};

export default Guardados;