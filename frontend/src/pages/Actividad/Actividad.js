import React from 'react';
import styled from 'styled-components';

const ActividadContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Actividad = () => {
  return (
    <ActividadContainer>
      <h1>📈 Mi Actividad</h1>
      <p>Resumen de tu actividad en Maia.Plus.</p>
    </ActividadContainer>
  );
};

export default Actividad;