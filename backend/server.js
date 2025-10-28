const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://maia-plus.vercel.app', 'https://your-custom-domain.com']
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/prices', require('./routes/prices'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/emergency', require('./routes/emergency'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.1'
  });
});

// Socket.IO para chat en tiempo real
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('join_chat', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`Usuario ${userId} se unió al chat`);
  });

  socket.on('send_message', async (data) => {
    try {
      // Aquí procesaremos el mensaje con IA
      const response = await processAIMessage(data.message, data.userId);
      
      // Enviar respuesta al usuario
      socket.to(`user_${data.userId}`).emit('ai_response', {
        message: response,
        timestamp: new Date().toISOString(),
        type: 'ai'
      });
    } catch (error) {
      console.error('Error procesando mensaje:', error);
      socket.to(`user_${data.userId}`).emit('ai_response', {
        message: 'Lo siento, hubo un error. ¿Puedes intentar de nuevo?',
        timestamp: new Date().toISOString(),
        type: 'error'
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Función temporal para procesar mensajes con IA
async function processAIMessage(message, userId) {
  // TODO: Integrar con Google Gemini API
  const responses = [
    "¡Hola! Soy Maia, tu guardiana en Tulum. ¿En qué puedo protegerte hoy?",
    "Entiendo tu preocupación. Déjame ayudarte con información actualizada.",
    "Para precios justos, puedo consultar nuestra base de datos. ¿Qué servicio necesitas?",
    "¿Necesitas ayuda con transporte seguro? Te recomiendo estos taxis verificados...",
    "Para emergencias, siempre puedes contactar a la policía turística al 911."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Servidor Maia.Plus ejecutándose en puerto ${PORT}`);
  console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});