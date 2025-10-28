import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    font-weight: ${props => props.theme.fonts.weights.normal};
    line-height: 1.6;
    color: ${props => props.theme.colors.dark};
    background-color: ${props => props.theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Scrollbar personalizado */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }

  /* Utilidades */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-sm {
    gap: ${props => props.theme.spacing.sm};
  }

  .gap-md {
    gap: ${props => props.theme.spacing.md};
  }

  .gap-lg {
    gap: ${props => props.theme.spacing.lg};
  }

  .mb-sm {
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  .mb-md {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  .mb-lg {
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  .mt-sm {
    margin-top: ${props => props.theme.spacing.sm};
  }

  .mt-md {
    margin-top: ${props => props.theme.spacing.md};
  }

  .mt-lg {
    margin-top: ${props => props.theme.spacing.lg};
  }

  /* Animaciones */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }

  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  /* Responsive */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
    
    .container {
      padding: 0 ${props => props.theme.spacing.sm};
    }
  }

  /* Focus states para accesibilidad */
  button:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Botones y elementos interactivos */
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /* Estados de carga */
  .loading {
    pointer-events: none;
    opacity: 0.6;
  }

  .loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid ${props => props.theme.colors.primary};
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default GlobalStyles;