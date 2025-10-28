import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiDollarSign, 
  FiCompass, 
  FiGift,
  FiMessageCircle,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi';

const HomeContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.md};
  text-align: center;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fonts.sizes['4xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.2;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fonts.sizes['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fonts.sizes.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ChatButton = styled(motion.button)`
  background: white;
  color: ${props => props.theme.colors.primary};
  border: none;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin: 0 auto ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
  
  svg {
    font-size: ${props => props.theme.fonts.sizes.xl};
  }
`;

const FeaturesSection = styled.section`
  background: white;
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.md};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${props => props.theme.fonts.sizes['3xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.gradient || props.theme.colors.primaryGradient};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  
  svg {
    font-size: ${props => props.theme.fonts.sizes['2xl']};
    color: white;
  }
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.fonts.sizes['4xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.gray};
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FiDollarSign,
      title: "Precios Justos",
      description: "Nunca más te estafen. Consulta precios reales y denuncia abusos al instante.",
      gradient: "linear-gradient(135deg, #06D6A0 0%, #00B4D8 100%)",
      path: "/precios"
    },
    {
      icon: FiShield,
      title: "Protección 24/7",
      description: "Asistencia inmediata en español e inglés. Siempre hay alguien cuidándote.",
      gradient: "linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)",
      path: "/chat"
    },
    {
      icon: FiCompass,
      title: "Experiencias Curadas",
      description: "Los mejores planes sin estrés. Itinerarios inteligentes y alertas en tiempo real.",
      gradient: "linear-gradient(135deg, #90E0EF 0%, #00B4D8 100%)",
      path: "/experiencias"
    },
    {
      icon: FiGift,
      title: "Recompensas Exclusivas",
      description: "Gana puntos mientras exploras. Descuentos en comercios verificados.",
      gradient: "linear-gradient(135deg, #FFD60A 0%, #06D6A0 100%)",
      path: "/recompensas"
    }
  ];

  const stats = [
    { number: "1,247", label: "Turistas Protegidos" },
    { number: "89", label: "Comercios Verificados" },
    { number: "156", label: "Abusos Reportados" },
    { number: "4.9", label: "Rating Promedio" }
  ];

  return (
    <HomeContainer>
      <BackgroundDecoration />
      
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tu Guardian Angel en Tulum ✨
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          El Gobierno de Tulum te protege. Viaja seguro, paga justo, vive increíble.
        </HeroSubtitle>
        
        <ChatButton
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/chat')}
        >
          <FiMessageCircle />
          Habla con Maia Ahora
        </ChatButton>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>¿Cómo te protegemos?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(feature.path)}
            >
              <FeatureIcon gradient={feature.gradient}>
                <feature.icon />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <SectionTitle>Impacto Real</SectionTitle>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home;