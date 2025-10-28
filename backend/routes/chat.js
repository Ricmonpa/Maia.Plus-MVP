const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Contexto base para Maia
const MAIA_CONTEXT = `
Eres Maia, la asistente de IA del Gobierno de Tulum que protege a los turistas. 

PERSONALIDAD:
- Amigable, protectora y confiable
- Hablas español e inglés perfectamente
- Siempre positiva pero seria cuando se trata de seguridad
- Representas al Gobierno de Tulum con orgullo

FUNCIONES PRINCIPALES:
1. PRECIOS JUSTOS: Ayudar a verificar precios y reportar abusos
2. SEGURIDAD 24/7: Información de emergencia, transporte seguro, contactos importantes
3. EXPERIENCIAS: Recomendar lugares, horarios, alertas de congestión
4. RECOMPENSAS: Explicar el sistema de puntos y descuentos

INFORMACIÓN CLAVE DE TULUM:
- Policía Turística: 911
- Transporte seguro: Taxis oficiales con placas amarillas
- Playas públicas: Acceso gratuito siempre
- Horarios de ruinas: 8:00 AM - 5:00 PM
- Temporada de sargazo: Mayo - Octubre

INSTRUCCIONES:
- Siempre menciona que representas al Gobierno de Tulum
- Si no sabes algo específico, ofrece contactar a las autoridades
- Para emergencias reales, dirige inmediatamente al 911
- Sé concisa pero completa en tus respuestas
`;

// POST /api/chat/message
router.post('/message', async (req, res) => {
  try {
    const { message, userId, language = 'es' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Configurar el modelo
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Crear el prompt completo
    const fullPrompt = `${MAIA_CONTEXT}

IDIOMA: Responde en ${language === 'en' ? 'inglés' : 'español'}

MENSAJE DEL TURISTA: ${message}

RESPUESTA:`;

    // Generar respuesta
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiMessage = response.text();

    // Guardar en base de datos (TODO: implementar)
    // await saveChatMessage(userId, message, aiMessage);

    res.json({
      success: true,
      response: aiMessage,
      timestamp: new Date().toISOString(),
      userId
    });

  } catch (error) {
    console.error('Error en chat:', error);
    
    // Respuesta de fallback
    const fallbackResponse = req.body.language === 'en' 
      ? "I'm sorry, I'm having technical difficulties. Please try again in a moment or contact tourist police at 911 for emergencies."
      : "Lo siento, tengo dificultades técnicas. Intenta de nuevo en un momento o contacta a la policía turística al 911 para emergencias.";

    res.status(500).json({
      success: false,
      response: fallbackResponse,
      error: 'Error procesando mensaje'
    });
  }
});

// GET /api/chat/history/:userId
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50 } = req.query;

    // TODO: Implementar obtención del historial de la base de datos
    const chatHistory = [];

    res.json({
      success: true,
      history: chatHistory,
      userId
    });

  } catch (error) {
    console.error('Error obteniendo historial:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo historial'
    });
  }
});

// POST /api/chat/feedback
router.post('/feedback', async (req, res) => {
  try {
    const { messageId, rating, feedback, userId } = req.body;

    // TODO: Guardar feedback en base de datos
    console.log('Feedback recibido:', { messageId, rating, feedback, userId });

    res.json({
      success: true,
      message: 'Feedback guardado correctamente'
    });

  } catch (error) {
    console.error('Error guardando feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Error guardando feedback'
    });
  }
});

// GET /api/chat/quick-responses
router.get('/quick-responses', (req, res) => {
  const { language = 'es' } = req.query;

  const quickResponses = language === 'en' ? [
    "How do I get to the ruins safely?",
    "What are fair prices for tours?",
    "Where can I find safe transportation?",
    "What should I do in an emergency?",
    "Which beaches are free to access?"
  ] : [
    "¿Cómo llego seguro a las ruinas?",
    "¿Cuáles son precios justos para tours?",
    "¿Dónde encuentro transporte seguro?",
    "¿Qué hago en una emergencia?",
    "¿Qué playas son de acceso gratuito?"
  ];

  res.json({
    success: true,
    quickResponses
  });
});

module.exports = router;