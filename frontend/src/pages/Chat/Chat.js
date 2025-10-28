import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSend, 
  FiMic, 
  FiImage, 
  FiMapPin,
  FiDollarSign,
  FiCompass,
  FiGift,
  FiAlertTriangle,
  FiUser,
  FiMessageCircle
} from 'react-icons/fi';

const ChatContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  background: white;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: calc(100vh - 160px);
  }
`;

const ChatHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  text-align: center;
`;

const ChatTitle = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.xl};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ChatSubtitle = styled.p`
  opacity: 0.9;
  font-size: ${props => props.theme.fonts.sizes.sm};
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.light};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
`;

const QuickActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: white;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.darkGray};
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;
  
  svg {
    color: ${props => props.color || props.theme.colors.primary};
  }
  
  &:hover {
    border-color: ${props => props.color || props.theme.colors.primary};
    background: ${props => props.color || props.theme.colors.primary}10;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
`;

const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.isUser ? props.theme.colors.primary : props.theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  
  svg {
    font-size: ${props => props.theme.fonts.sizes.lg};
  }
`;

const MessageBubble = styled.div`
  background: ${props => props.isUser ? props.theme.colors.primary : 'white'};
  color: ${props => props.isUser ? 'white' : props.theme.colors.dark};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: ${props => props.isUser ? 'none' : `1px solid ${props.theme.colors.lightGray}`};
  box-shadow: ${props => props.theme.shadows.sm};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    ${props => props.isUser ? 'right: -8px' : 'left: -8px'};
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${props => props.isUser ? '8px 0 8px 8px' : '8px 8px 8px 0'};
    border-color: ${props => props.isUser 
      ? `transparent transparent transparent ${props.theme.colors.primary}` 
      : `transparent ${props.isUser ? 'transparent' : 'white'} transparent transparent`};
  }
`;

const MessageTime = styled.span`
  font-size: ${props => props.theme.fonts.sizes.xs};
  color: ${props => props.theme.colors.gray};
  margin-top: ${props => props.theme.spacing.xs};
  display: block;
`;

const InputArea = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  background: white;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.full};
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.lightGray};
  
  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fonts.sizes.base};
  color: ${props => props.theme.colors.dark};
  
  &::placeholder {
    color: ${props => props.theme.colors.gray};
  }
  
  &:focus {
    outline: none;
  }
`;

const InputButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  border: none;
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.lightGray};
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray};
  font-style: italic;
  padding: ${props => props.theme.spacing.md};
`;

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy Maia, tu guardiana en Tulum 😊 ¿En qué puedo protegerte hoy?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    {
      icon: FiDollarSign,
      label: 'Verificar Precios',
      color: '#06D6A0',
      message: '¿Puedes ayudarme a verificar si un precio es justo?'
    },
    {
      icon: FiCompass,
      label: 'Planear Día',
      color: '#90E0EF',
      message: 'Quiero planear mi día en Tulum, ¿qué me recomiendas?'
    },
    {
      icon: FiMapPin,
      label: 'Transporte Seguro',
      color: '#00B4D8',
      message: '¿Cómo puedo moverme de forma segura en Tulum?'
    },
    {
      icon: FiAlertTriangle,
      label: 'Reportar Problema',
      color: '#F72585',
      message: 'Necesito reportar un problema o abuso de precio'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(messageText),
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message) => {
    const responses = {
      precio: "Te ayudo a verificar precios. ¿Qué servicio o producto quieres consultar? Puedo compararlo con nuestros precios de referencia.",
      planear: "¡Perfecto! Para crear el mejor plan, dime: ¿prefieres cultura (ruinas), naturaleza (cenotes) o playa? ¿Cuánto tiempo tienes?",
      transporte: "Para transporte seguro en Tulum: 🚕 Usa taxis oficiales con placas amarillas 🚌 Colectivos en rutas principales 🚲 Bicis para distancias cortas. ¿A dónde necesitas ir?",
      reportar: "Lamento que hayas tenido una mala experiencia. Puedo ayudarte a reportar el problema. ¿Fue un abuso de precio, mal servicio o problema de seguridad?"
    };

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('precio')) return responses.precio;
    if (lowerMessage.includes('plan') || lowerMessage.includes('día')) return responses.planear;
    if (lowerMessage.includes('transporte') || lowerMessage.includes('mover')) return responses.transporte;
    if (lowerMessage.includes('reportar') || lowerMessage.includes('problema')) return responses.reportar;

    return "Entiendo tu consulta. Como tu guardiana en Tulum, estoy aquí para ayudarte con precios justos, transporte seguro, mejores experiencias y cualquier problema que tengas. ¿En qué específicamente puedo asistirte?";
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>Chat con Maia</ChatTitle>
        <ChatSubtitle>Tu guardiana personal en Tulum está aquí para protegerte</ChatSubtitle>
      </ChatHeader>

      <QuickActions>
        {quickActions.map((action, index) => (
          <QuickActionButton
            key={index}
            color={action.color}
            onClick={() => handleQuickAction(action)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <action.icon />
            {action.label}
          </QuickActionButton>
        ))}
      </QuickActions>

      <MessagesArea>
        <AnimatePresence>
          {messages.map((message) => (
            <Message
              key={message.id}
              isUser={message.isUser}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MessageAvatar isUser={message.isUser}>
                {message.isUser ? <FiUser /> : <FiMessageCircle />}
              </MessageAvatar>
              <div>
                <MessageBubble isUser={message.isUser}>
                  {message.text}
                </MessageBubble>
                <MessageTime>{message.timestamp}</MessageTime>
              </div>
            </Message>
          ))}
        </AnimatePresence>

        {isTyping && (
          <TypingIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MessageAvatar isUser={false}>
              <FiMessageCircle />
            </MessageAvatar>
            <span>Maia está escribiendo...</span>
          </TypingIndicator>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesArea>

      <InputArea>
        <InputContainer>
          <InputButton>
            <FiImage />
          </InputButton>
          <InputButton>
            <FiMapPin />
          </InputButton>
          <MessageInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta..."
          />
          <InputButton>
            <FiMic />
          </InputButton>
          <InputButton 
            primary 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
          >
            <FiSend />
          </InputButton>
        </InputContainer>
      </InputArea>
    </ChatContainer>
  );
};

export default Chat;