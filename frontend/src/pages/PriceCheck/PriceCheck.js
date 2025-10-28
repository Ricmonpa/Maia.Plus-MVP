import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiDollarSign, 
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiFlag
} from 'react-icons/fi';

const PriceCheckContainer = styled.div`
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

const SearchSection = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SearchContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fonts.sizes.base};
  transition: all ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray};
  }
`;

const PriceInput = styled.input`
  width: 150px;
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fonts.sizes.base};
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const SearchButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  svg {
    font-size: ${props => props.theme.fonts.sizes.lg};
  }
`;

const QuickCategories = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fonts.sizes.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const ResultsSection = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PriceAnalysis = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PriceCard = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 2px solid ${props => {
    if (props.type === 'fair') return props.theme.colors.success;
    if (props.type === 'high') return props.theme.colors.warning;
    if (props.type === 'abusive') return props.theme.colors.danger;
    return props.theme.colors.lightGray;
  }};
  background: ${props => {
    if (props.type === 'fair') return props.theme.colors.success + '10';
    if (props.type === 'high') return props.theme.colors.warning + '10';
    if (props.type === 'abusive') return props.theme.colors.danger + '10';
    return props.theme.colors.light;
  }};
  text-align: center;
`;

const PriceCardIcon = styled.div`
  font-size: ${props => props.theme.fonts.sizes['2xl']};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => {
    if (props.type === 'fair') return props.theme.colors.success;
    if (props.type === 'high') return props.theme.colors.warning;
    if (props.type === 'abusive') return props.theme.colors.danger;
    return props.theme.colors.gray;
  }};
`;

const PriceCardTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PriceCardValue = styled.div`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.primary};
`;

const ReportSection = styled.div`
  background: ${props => props.theme.colors.danger}10;
  border: 1px solid ${props => props.theme.colors.danger}30;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const ReportButton = styled(motion.button)`
  background: ${props => props.theme.colors.danger};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin: ${props => props.theme.spacing.md} auto 0;
  cursor: pointer;
`;

const RecentReports = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const ReportItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PriceCheck = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportedPrice, setReportedPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [priceAnalysis, setPriceAnalysis] = useState(null);

  const categories = [
    'Restaurantes', 'Tours', 'Transporte', 'Hoteles', 'Cenotes', 'Actividades'
  ];

  const mockPriceData = {
    'tour cenotes': {
      service: 'Tour 2 Cenotes',
      minPrice: 800,
      maxPrice: 1200,
      avgPrice: 1000,
      reportedPrice: 1500,
      analysis: 'abusive'
    },
    'taxi ruinas': {
      service: 'Taxi a Ruinas',
      minPrice: 150,
      maxPrice: 200,
      avgPrice: 175,
      reportedPrice: 180,
      analysis: 'fair'
    }
  };

  const recentReports = [
    { service: 'Tour Sian Ka\'an', price: 2500, status: 'investigating', time: '2 horas' },
    { service: 'Cena Posada Margherita', price: 800, status: 'resolved', time: '1 día' },
    { service: 'Taxi Zona Hotelera', price: 300, status: 'confirmed', time: '3 días' }
  ];

  const handleSearch = () => {
    const key = searchTerm.toLowerCase();
    const data = mockPriceData[key] || {
      service: searchTerm,
      minPrice: 100,
      maxPrice: 300,
      avgPrice: 200,
      reportedPrice: parseInt(reportedPrice) || 250,
      analysis: parseInt(reportedPrice) > 300 ? 'abusive' : parseInt(reportedPrice) > 250 ? 'high' : 'fair'
    };

    setPriceAnalysis(data);
    setShowResults(true);
  };

  const getAnalysisIcon = (type) => {
    switch (type) {
      case 'fair': return <FiCheckCircle />;
      case 'high': return <FiTrendingUp />;
      case 'abusive': return <FiXCircle />;
      default: return <FiDollarSign />;
    }
  };

  const getAnalysisText = (type) => {
    switch (type) {
      case 'fair': return 'Precio Justo ✅';
      case 'high': return 'Precio Alto ⚠️';
      case 'abusive': return 'Precio Abusivo ❌';
      default: return 'Analizando...';
    }
  };

  return (
    <PriceCheckContainer>
      <Header>
        <Title>💰 Precios Justos</Title>
        <Subtitle>
          Verifica precios al instante y protégete de abusos. 
          Tu seguridad económica es nuestra prioridad.
        </Subtitle>
      </Header>

      <SearchSection>
        <SearchContainer>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="¿Qué servicio quieres verificar? (ej: tour cenotes, taxi ruinas)"
          />
          <PriceInput
            value={reportedPrice}
            onChange={(e) => setReportedPrice(e.target.value)}
            placeholder="$0 MXN"
            type="number"
          />
          <SearchButton
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSearch />
            Verificar
          </SearchButton>
        </SearchContainer>

        <QuickCategories>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </CategoryButton>
          ))}
        </QuickCategories>
      </SearchSection>

      <AnimatePresence>
        {showResults && priceAnalysis && (
          <ResultsSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              Análisis de Precio: {priceAnalysis.service}
            </h2>

            <PriceAnalysis>
              <PriceCard type="fair">
                <PriceCardIcon type="fair">
                  <FiCheckCircle />
                </PriceCardIcon>
                <PriceCardTitle>Precio Mínimo</PriceCardTitle>
                <PriceCardValue>${priceAnalysis.minPrice} MXN</PriceCardValue>
              </PriceCard>

              <PriceCard>
                <PriceCardIcon>
                  <FiTrendingUp />
                </PriceCardIcon>
                <PriceCardTitle>Precio Promedio</PriceCardTitle>
                <PriceCardValue>${priceAnalysis.avgPrice} MXN</PriceCardValue>
              </PriceCard>

              <PriceCard type="high">
                <PriceCardIcon type="high">
                  <FiTrendingDown />
                </PriceCardIcon>
                <PriceCardTitle>Precio Máximo</PriceCardTitle>
                <PriceCardValue>${priceAnalysis.maxPrice} MXN</PriceCardValue>
              </PriceCard>

              <PriceCard type={priceAnalysis.analysis}>
                <PriceCardIcon type={priceAnalysis.analysis}>
                  {getAnalysisIcon(priceAnalysis.analysis)}
                </PriceCardIcon>
                <PriceCardTitle>Tu Precio</PriceCardTitle>
                <PriceCardValue>${priceAnalysis.reportedPrice} MXN</PriceCardValue>
              </PriceCard>
            </PriceAnalysis>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: priceAnalysis.analysis === 'fair' ? '#06D6A0' : priceAnalysis.analysis === 'high' ? '#FFD60A' : '#F72585' }}>
                {getAnalysisText(priceAnalysis.analysis)}
              </h3>
            </div>

            {priceAnalysis.analysis !== 'fair' && (
              <ReportSection>
                <h4 style={{ marginBottom: '0.5rem' }}>¿Te están cobrando de más?</h4>
                <p style={{ marginBottom: '1rem', color: '#6C757D' }}>
                  Reporta este abuso para proteger a otros turistas
                </p>
                <ReportButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiFlag />
                  Reportar Abuso de Precio
                </ReportButton>
              </ReportSection>
            )}
          </ResultsSection>
        )}
      </AnimatePresence>

      <RecentReports>
        <h2 style={{ marginBottom: '1.5rem' }}>📊 Reportes Recientes</h2>
        {recentReports.map((report, index) => (
          <ReportItem key={index}>
            <div>
              <strong>{report.service}</strong>
              <div style={{ fontSize: '0.875rem', color: '#6C757D' }}>
                ${report.price} MXN • hace {report.time}
              </div>
            </div>
            <div style={{ 
              padding: '0.25rem 0.75rem', 
              borderRadius: '1rem', 
              fontSize: '0.75rem',
              background: report.status === 'resolved' ? '#06D6A0' : report.status === 'investigating' ? '#FFD60A' : '#00B4D8',
              color: 'white'
            }}>
              {report.status === 'resolved' ? 'Resuelto' : report.status === 'investigating' ? 'Investigando' : 'Confirmado'}
            </div>
          </ReportItem>
        ))}
      </RecentReports>
    </PriceCheckContainer>
  );
};

export default PriceCheck;