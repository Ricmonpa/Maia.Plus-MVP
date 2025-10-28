import React from 'react';
import styled from 'styled-components';

const ReportesContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Reportes = () => {
  return (
    <ReportesContainer>
      <h1>📊 Mis Reportes</h1>
      <p>Aquí verás el historial de tus reportes de precios abusivos.</p>
    </ReportesContainer>
  );
};

export default Reportes;