import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCompass, 
  FiMapPin, 
  FiClock, 
  FiDollarSign,
  FiStar,
  FiUsers,
  FiCalendar,
  FiHeart,
  FiPlus,
  FiCheck
} from 'react-icons/fi';

const ExperiencesContainer = styled.div`
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

const FilterSection = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.active ? props.theme.colors.primaryGradient : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const BucketlistSection = styled.div`
  background: ${props => props.theme.colors.successGradient};
  color: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const BucketlistTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes['2xl']};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const BucketlistStats = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.fonts.sizes['2xl']};
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fonts.sizes.sm};
  opacity: 0.9;
`;

const ExperiencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ExperienceCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ExperienceImage = styled.div`
  height: 200px;
  background: ${props => props.gradient || props.theme.colors.primaryGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fonts.sizes['3xl']};
  position: relative;
`;

const ExperienceContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExperienceTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ExperienceCategory = styled.span`
  background: ${props => props.color || props.theme.colors.primary}20;
  color: ${props => props.color || props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fonts.sizes.xs};
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const ExperienceDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: ${props => props.theme.fonts.sizes.sm};
  line-height: 1.5;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExperienceDetails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.gray};
  font-size: ${props => props.theme.fonts.sizes.sm};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const ExperienceActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`;

const ActionButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.primary ? props.theme.colors.primaryGradient : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fonts.weights.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: pointer;
  font-size: ${props => props.theme.fonts.sizes.sm};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const HeartButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  border: none;
  background: ${props => props.liked ? props.theme.colors.danger : props.theme.colors.lightGray};
  color: ${props => props.liked ? 'white' : props.theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.danger};
    color: white;
  }
`;

const SmartRecommendations = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const Experiences = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [likedExperiences, setLikedExperiences] = useState(new Set());
  const [bucketlist, setBucketlist] = useState(new Set());

  const filters = [
    { id: 'todos', label: 'Todos', icon: FiCompass },
    { id: 'cultura', label: 'Cultura', icon: FiMapPin },
    { id: 'naturaleza', label: 'Naturaleza', icon: FiStar },
    { id: 'playa', label: 'Playa', icon: FiHeart },
    { id: 'aventura', label: 'Aventura', icon: FiUsers }
  ];

  const experiences = [
    {
      id: 1,
      title: 'Ruinas de Tulum',
      category: 'Cultura',
      description: 'Sitio arqueológico maya con vista espectacular al mar Caribe',
      duration: '3 horas',
      price: '85',
      rating: 4.8,
      difficulty: 'Fácil',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      categoryColor: '#667eea',
      bestTime: 'Temprano (8-10 AM)',
      tips: ['Lleva protector solar', 'Usa zapatos cómodos', 'Trae agua']
    },
    {
      id: 2,
      title: 'Cenote Dos Ojos',
      category: 'Naturaleza',
      description: 'Sistema de cenotes cristalinos perfecto para snorkel y buceo',
      duration: '4 horas',
      price: '350-500',
      rating: 4.9,
      difficulty: 'Moderado',
      gradient: 'linear-gradient(135deg, #06D6A0 0%, #00B4D8 100%)',
      categoryColor: '#06D6A0',
      bestTime: 'Medio día',
      tips: ['Trae equipo de snorkel', 'Cámara acuática', 'Toalla']
    },
    {
      id: 3,
      title: 'Playa Paraíso',
      category: 'Playa',
      description: 'Playa pública con arena blanca y aguas turquesas',
      duration: '6 horas',
      price: 'Gratis',
      rating: 4.7,
      difficulty: 'Fácil',
      gradient: 'linear-gradient(135deg, #90E0EF 0%, #00B4D8 100%)',
      categoryColor: '#90E0EF',
      bestTime: 'Todo el día',
      tips: ['Acceso gratuito', 'Lleva sombrilla', 'Protector solar']
    },
    {
      id: 4,
      title: 'Sian Ka\'an',
      category: 'Naturaleza',
      description: 'Reserva de la biosfera con tours de vida silvestre',
      duration: '8 horas',
      price: '1200-2000',
      rating: 4.6,
      difficulty: 'Moderado',
      gradient: 'linear-gradient(135deg, #06D6A0 0%, #0077B6 100%)',
      categoryColor: '#06D6A0',
      bestTime: 'Temporada seca',
      tips: ['Tour completo', 'Incluye comida', 'Repelente']
    }
  ];

  const filteredExperiences = activeFilter === 'todos' 
    ? experiences 
    : experiences.filter(exp => exp.category.toLowerCase() === activeFilter);

  const toggleLike = (id) => {
    const newLiked = new Set(likedExperiences);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedExperiences(newLiked);
  };

  const toggleBucketlist = (id) => {
    const newBucketlist = new Set(bucketlist);
    if (newBucketlist.has(id)) {
      newBucketlist.delete(id);
    } else {
      newBucketlist.add(id);
    }
    setBucketlist(newBucketlist);
  };

  return (
    <ExperiencesContainer>
      <Header>
        <Title>🎯 Experiencias Curadas</Title>
        <Subtitle>
          Los mejores planes sin estrés. Itinerarios inteligentes 
          y recomendaciones personalizadas por IA.
        </Subtitle>
      </Header>

      <BucketlistSection>
        <BucketlistTitle>🎯 Mi Bucketlist Inteligente</BucketlistTitle>
        <BucketlistStats>
          <StatItem>
            <StatNumber>{bucketlist.size}</StatNumber>
            <StatLabel>En mi lista</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>0</StatNumber>
            <StatLabel>Completadas</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>85%</StatNumber>
            <StatLabel>Match IA</StatLabel>
          </StatItem>
        </BucketlistStats>
        <p style={{ opacity: 0.9 }}>
          Nuestra IA analiza tus preferencias y crea la lista perfecta para tu viaje
        </p>
      </BucketlistSection>

      <FilterSection>
        <FilterTabs>
          {filters.map((filter) => (
            <FilterTab
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <filter.icon style={{ marginRight: '0.5rem' }} />
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>
      </FilterSection>

      <ExperiencesGrid>
        <AnimatePresence>
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <ExperienceImage gradient={experience.gradient}>
                🏝️
              </ExperienceImage>
              
              <ExperienceContent>
                <ExperienceHeader>
                  <div>
                    <ExperienceTitle>{experience.title}</ExperienceTitle>
                    <ExperienceCategory color={experience.categoryColor}>
                      {experience.category}
                    </ExperienceCategory>
                  </div>
                  <HeartButton
                    liked={likedExperiences.has(experience.id)}
                    onClick={() => toggleLike(experience.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiHeart />
                  </HeartButton>
                </ExperienceHeader>

                <ExperienceDescription>
                  {experience.description}
                </ExperienceDescription>

                <ExperienceDetails>
                  <DetailItem>
                    <FiClock />
                    {experience.duration}
                  </DetailItem>
                  <DetailItem>
                    <FiDollarSign />
                    ${experience.price} MXN
                  </DetailItem>
                  <DetailItem>
                    <FiStar />
                    {experience.rating}
                  </DetailItem>
                </ExperienceDetails>

                <ExperienceActions>
                  <ActionButton
                    primary={bucketlist.has(experience.id)}
                    onClick={() => toggleBucketlist(experience.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {bucketlist.has(experience.id) ? <FiCheck /> : <FiPlus />}
                    {bucketlist.has(experience.id) ? 'En Lista' : 'Agregar'}
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiCalendar />
                    Planear
                  </ActionButton>
                </ExperienceActions>
              </ExperienceContent>
            </ExperienceCard>
          ))}
        </AnimatePresence>
      </ExperiencesGrid>

      <SmartRecommendations>
        <h2 style={{ marginBottom: '1rem' }}>🤖 Recomendaciones IA</h2>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '0.75rem',
          border: '1px solid #e9ecef'
        }}>
          <p style={{ margin: 0, color: '#6c757d' }}>
            <strong>💡 Tip Inteligente:</strong> Basado en tu actividad, te recomendamos visitar 
            las Ruinas de Tulum temprano (8 AM) y después ir a Playa Paraíso. 
            El clima estará perfecto y evitarás las multitudes.
          </p>
        </div>
      </SmartRecommendations>
    </ExperiencesContainer>
  );
};

export default Experiences;