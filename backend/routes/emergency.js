const express = require('express');
const router = express.Router();

// GET /api/emergency/contacts
router.get('/contacts', async (req, res) => {
  try {
    const emergencyContacts = [
      {
        id: 1,
        name: 'Policía Turística',
        phone: '911',
        category: 'police',
        address: 'Centro de Tulum',
        hours: '24 horas',
        languages: ['es', 'en']
      },
      {
        id: 2,
        name: 'Cruz Roja',
        phone: '065',
        category: 'medical',
        address: 'Av. Tulum, Centro',
        hours: '24 horas',
        languages: ['es', 'en']
      }
    ];
    
    res.json({
      success: true,
      contacts: emergencyContacts
    });
  } catch (error) {
    console.error('Error obteniendo contactos de emergencia:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo contactos'
    });
  }
});

// POST /api/emergency/alert
router.post('/alert', async (req, res) => {
  try {
    const { type, location, description, userId } = req.body;
    
    // TODO: Procesar alerta de emergencia
    console.log('Alerta de emergencia:', { type, location, description, userId });
    
    res.json({
      success: true,
      message: 'Alerta procesada',
      alertId: Date.now()
    });
  } catch (error) {
    console.error('Error procesando alerta:', error);
    res.status(500).json({
      success: false,
      error: 'Error procesando alerta'
    });
  }
});

module.exports = router;