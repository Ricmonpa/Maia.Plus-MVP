import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiMessageCircle, 
  FiDollarSign, 
  FiCompass, 
  FiGift,
  FiAlertTriangle,
  FiBarChart2,
  FiShield,
  FiTrendingUp,
  FiMapPin,
  FiStar
} from 'react-icons/fi';

const SidebarContainer = styled.aside`
  width: 280px;
  background: white;
  border-right: 1px solid ${props => props.theme.colors.lightGray};
  box-shadow: ${props => props.theme.shadows.lg};
  position: fixed;
  top: 80px; /* Altura del header */
  left: 0;
  bottom: 0;
  z-index: ${props => props.theme.zIndex.fixed};
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform ${props => props.theme.transitions.normal};
  overflow-y: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    top: 80px;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
`;

const SidebarContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fonts.sizes.sm};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.gray};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  
  &:first-child {
    margin-top: 0;
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.darkGray};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;
  
  svg {
    font-size: ${props => props.theme.fonts.sizes.lg};
    flex-shrink: 0;
  }
  
  &:hover {
    background: ${props => props.theme.colors.accent}20;
    color: ${props => props.theme.colors.primary};
    transform: translateX(4px);
  }
  
  &.active {
    background: ${props => props.theme.colors.primaryGradient};
    color: white;
    box-shadow: ${props => props.theme.shadows.md};
    
    &::before {
      content: '';
      position: absolute;
      left: -${props => props.theme.spacing.lg};
      top: 0;
      bottom: 0;
      width: 4px;
      background: ${props => props.theme.colors.success};
      border-radius: 0 4px 4px 0;
    }
  }
`;

const EmergencyItem = styled(NavItem)`
  background: ${props => props.theme.colors.danger}10;
  border: 1px solid ${props => props.theme.colors.danger}30;
  color: ${props => props.theme.colors.danger};
  
  &:hover {
    background: ${props => props.theme.colors.danger}20;
    color: ${props => props.theme.colors.danger};
    border-color: ${props => props.theme.colors.danger};
  }
  
  &.active {
    background: ${props => props.theme.colors.danger};
    color: white;
    border-color: ${props => props.theme.colors.danger};
  }
`;

const QuickStats = styled.div`
  margin-top: auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.lightGray};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  }
`;

const StatLabel = styled.span`
  font-size: ${props => props.theme.fonts.sizes.sm};
  color: ${props => props.theme.colors.gray};
`;

const StatValue = styled.span`
  font-weight: ${props => props.theme.fonts.weights.semibold};
  color: ${props => props.theme.colors.primary};
`;

const Badge = styled.span`
  background: ${props => props.color || props.theme.colors.primary};
  color: white;
  font-size: ${props => props.theme.fonts.sizes.xs};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  padding: 2px 6px;
  border-radius: ${props => props.theme.borderRadius.full};
  margin-left: auto;
`;

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const mainFeatures = [
    {
      icon: FiMessageCircle,
      label: 'Chat con Maia',
      path: '/chat',
      badge: null
    },
    {
      icon: FiDollarSign,
      label: 'Precios Justos',
      path: '/precios',
      badge: { text: 'Smart', color: '#06D6A0' }
    },
    {
      icon: FiCompass,
      label: 'Experiencias',
      path: '/experiencias',
      badge: { text: 'IA', color: '#90E0EF' }
    },
    {
      icon: FiGift,
      label: 'Recompensas',
      path: '/recompensas',
      badge: { text: '150', color: '#FFD60A' }
    }
  ];

  const toolsFeatures = [
    {
      icon: FiBarChart2,
      label: 'Mis Reportes',
      path: '/reportes'
    },
    {
      icon: FiMapPin,
      label: 'Lugares Guardados',
      path: '/guardados'
    },
    {
      icon: FiTrendingUp,
      label: 'Mi Actividad',
      path: '/actividad'
    },
    {
      icon: FiStar,
      label: 'Mis Reviews',
      path: '/reviews'
    }
  ];

  const stats = [
    { label: 'Puntos', value: '150' },
    { label: 'Reportes', value: '3' },
    { label: 'Lugares', value: '12' },
    { label: 'Nivel', value: 'Bronze' }
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent>
        <SectionTitle>🏝️ Protección Tulum</SectionTitle>
        <NavList>
          {mainFeatures.map((item, index) => (
            <NavItem 
              key={index} 
              to={item.path}
              onClick={() => window.innerWidth < 768 && onClose()}
            >
              <item.icon />
              <span>{item.label}</span>
              {item.badge && (
                <Badge color={item.badge.color}>
                  {item.badge.text}
                </Badge>
              )}
            </NavItem>
          ))}
        </NavList>

        <SectionTitle>🛠️ Herramientas</SectionTitle>
        <NavList>
          {toolsFeatures.map((item, index) => (
            <NavItem 
              key={index} 
              to={item.path}
              onClick={() => window.innerWidth < 768 && onClose()}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavList>

        <SectionTitle>🆘 Emergencia</SectionTitle>
        <NavList>
          <EmergencyItem 
            to="/emergencia"
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <FiAlertTriangle />
            <span>Ayuda Inmediata</span>
          </EmergencyItem>
        </NavList>

        <QuickStats>
          <SectionTitle style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>
            📊 Mi Progreso
          </SectionTitle>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatLabel>{stat.label}</StatLabel>
              <StatValue>{stat.value}</StatValue>
            </StatItem>
          ))}
        </QuickStats>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;