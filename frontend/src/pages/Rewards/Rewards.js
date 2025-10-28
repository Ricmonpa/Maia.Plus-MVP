import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiStar, 
  FiTarget,
  FiHexagon
} from 'react-icons/fi';

const RewardsContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fonts.sizes['3xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fonts.sizes.lg};
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const StatsSection = styled.div`
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StatCard = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.fonts.sizes['3xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fonts.sizes.sm};
  opacity: 0.9;
`;

const LevelProgress = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.full};
  height: 12px;
  margin: ${props => props.theme.spacing.lg} 0;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  background: white;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius.full};
  width: ${props => props.progress}%;
`;

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('disponibles');

  const userStats = {
    points: 150,
    level: 'Bronze',
    nextLevel: 'Silver',
    progress: 60,
    pointsToNext: 100,
    totalEarned: 150,
    totalSpent: 0
  };

  return (
    <RewardsContainer>
      <Header>
        <Title>🎁 Recompensas Exclusivas</Title>
        <Subtitle>
          Gana puntos mientras exploras y canjéalos por descuentos 
          en comercios verificados de Tulum.
        </Subtitle>
      </Header>

      <StatsSection>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          <FiHexagon style={{ marginRight: '0.5rem' }} />
          Nivel {userStats.level}
        </h2>
        
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatNumber>{userStats.points}</StatNumber>
            <StatLabel>Puntos Disponibles</StatLabel>
          </StatCard>
          
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatNumber>{userStats.totalEarned}</StatNumber>
            <StatLabel>Total Ganados</StatLabel>
          </StatCard>
          
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatNumber>{userStats.pointsToNext}</StatNumber>
            <StatLabel>Para {userStats.nextLevel}</StatLabel>
          </StatCard>
        </StatsGrid>

        <div>
          <p style={{ marginBottom: '0.5rem', opacity: 0.9 }}>
            Progreso a {userStats.nextLevel}: {userStats.progress}%
          </p>
          <LevelProgress>
            <ProgressBar 
              progress={userStats.progress}
              initial={{ width: 0 }}
              animate={{ width: `${userStats.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </LevelProgress>
        </div>
      </StatsSection>

      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>💎 ¿Cómo Ganar Puntos?</h2>
        <p style={{ color: '#6C757D', marginBottom: '1.5rem' }}>
          Protege a otros turistas y gana recompensas exclusivas
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #e9ecef', borderRadius: '0.5rem' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'linear-gradient(135deg, #F72585 0%, #B5179E 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              <FiTarget />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Reportar Precios</h3>
            <div style={{ color: '#06D6A0', fontWeight: 'bold', marginBottom: '0.5rem' }}>+25 puntos</div>
            <p style={{ fontSize: '0.875rem', color: '#6C757D', margin: 0 }}>
              Por cada reporte válido de precio abusivo
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #e9ecef', borderRadius: '0.5rem' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'linear-gradient(135deg, #FFD60A 0%, #FF8500 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              <FiStar />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Escribir Reviews</h3>
            <div style={{ color: '#06D6A0', fontWeight: 'bold', marginBottom: '0.5rem' }}>+15 puntos</div>
            <p style={{ fontSize: '0.875rem', color: '#6C757D', margin: 0 }}>
              Por cada review útil de comercio
            </p>
          </div>
        </div>
      </div>
    </RewardsContainer>
  );
};

export default Rewards;