import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FiShield, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  padding: ${props => props.theme.spacing.md} 0;
  box-shadow: ${props => props.theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.sticky};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

const LogoIcon = styled(FiShield)`
  font-size: ${props => props.theme.fonts.sizes['2xl']};
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.fonts.sizes.lg};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const MenuButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  svg {
    font-size: ${props => props.theme.fonts.sizes.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.showSidebar ? 'flex' : 'none'};
  }
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  svg {
    font-size: ${props => props.theme.fonts.sizes.lg};
  }
`;

const getPageTitle = (pathname) => {
  const titles = {
    '/': 'Inicio',
    '/chat': 'Chat con Maia',
    '/precios': 'Precios Justos',
    '/experiencias': 'Experiencias',
    '/recompensas': 'Recompensas',
    '/emergencia': 'Emergencia'
  };
  return titles[pathname] || 'Maia.Plus';
};

const Header = ({ sidebarOpen, setSidebarOpen, showSidebar }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {showSidebar && (
            <MenuButton 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              showSidebar={showSidebar}
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </MenuButton>
          )}
          
          {isHome ? (
            <Logo>
              <LogoIcon />
              Maia.Plus
            </Logo>
          ) : (
            <PageTitle>{getPageTitle(location.pathname)}</PageTitle>
          )}
        </div>
        
        <HeaderActions>
          <ActionButton>
            <FiBell />
          </ActionButton>
          <ActionButton>
            <FiUser />
          </ActionButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;