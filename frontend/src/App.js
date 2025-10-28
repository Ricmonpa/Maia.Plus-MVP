import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

// Components
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import PriceCheck from './pages/PriceCheck/PriceCheck';
import Experiences from './pages/Experiences/Experiences';
import Rewards from './pages/Rewards/Rewards';
import Emergency from './pages/Emergency/Emergency';
import Reportes from './pages/Reportes/Reportes';
import Guardados from './pages/Guardados/Guardados';
import Actividad from './pages/Actividad/Actividad';
import Reviews from './pages/Reviews/Reviews';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/precios" element={<PriceCheck />} />
            <Route path="/experiencias" element={<Experiences />} />
            <Route path="/recompensas" element={<Rewards />} />
            <Route path="/emergencia" element={<Emergency />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/guardados" element={<Guardados />} />
            <Route path="/actividad" element={<Actividad />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme.colors.primary,
            color: 'white',
            borderRadius: '12px',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;