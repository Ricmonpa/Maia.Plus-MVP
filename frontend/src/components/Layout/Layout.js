import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Navigation from './Navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.light};
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  flex: 1;
  padding-bottom: 80px; /* Espacio para navegación móvil */
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding-bottom: 0;
    margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
    transition: margin-left ${props => props.theme.transitions.normal};
  }
`;

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    // Ocultar sidebar en la página de inicio en móvil
    const showSidebar = location.pathname !== '/' || window.innerWidth >= 768;

    return (
        <LayoutContainer>
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                showSidebar={showSidebar}
            />
            <ContentArea>
                {showSidebar && (
                    <Sidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                )}
                <Main sidebarOpen={sidebarOpen && showSidebar}>
                    {children}
                </Main>
            </ContentArea>
            <Navigation />
        </LayoutContainer>
    );
};

export default Layout;