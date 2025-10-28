import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiMessageCircle, 
  FiDollarSign, 
  FiCompass, 
  FiGift,
  FiAlertTriangle 
} from 'react-icons/fi';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: ${props => props.theme.zIndex.fixed};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none; /* Ocultar en desktop, usar sidebar */
  }
`;

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;
  max-width: 600px;
  margin: 0 auto;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray};
  text-decoration: none;
  font-size: ${props => props.theme.fonts.sizes.xs};
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: all ${props => props.theme.transitions.fast};
  border-radius: ${props => props.theme.borderRadius.md};
  min-width: 60px;
  
  svg {
    font-size: ${props => props.theme.fonts.sizes.lg};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.accent}20;
    
    svg {
      transform: scale(1.1);
    }
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const EmergencyButton = styled(NavItem)`
  background: ${props => props.theme.colors.danger};
  color: white;
  
  &:hover, &.active {
    background: ${props => props.theme.colors.danger};
    color: white;
    transform: scale(1.05);
  }
`;

const Navigation = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem to="/" end>
          <FiHome />
          <span>Inicio</span>
        </NavItem>
        
        <NavItem to="/chat">
          <FiMessageCircle />
          <span>Chat</span>
        </NavItem>
        
        <NavItem to="/precios">
          <FiDollarSign />
          <span>Precios</span>
        </NavItem>
        
        <NavItem to="/experiencias">
          <FiCompass />
          <span>Planes</span>
        </NavItem>
        
        <NavItem to="/recompensas">
          <FiGift />
          <span>Premios</span>
        </NavItem>
        
        <EmergencyButton to="/emergencia">
          <FiAlertTriangle />
          <span>SOS</span>
        </EmergencyButton>
      </NavList>
    </NavContainer>
  );
};

export default Navigation;