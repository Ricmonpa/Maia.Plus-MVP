const express = require('express');
const router = express.Router();

// POST /api/reports
router.post('/', async (req, res) => {
  try {
    const { type, description, location, userId } = req.body;
    
    // TODO: Guardar reporte en base de datos
    console.log('Reporte recibido:', { type, description, location, userId });
    
    res.json({
      success: true,
      message: 'Reporte enviado correctamente',
      reportId: Date.now()
    });
  } catch (error) {
    console.error('Error enviando reporte:', error);
    res.status(500).json({
      success: false,
      error: 'Error enviando reporte'
    });
  }
});

// GET /api/reports/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock data
    const mockReports = [
      {
        id: 1,
        type: 'price_abuse',
        description: 'Precio excesivo en tour',
        status: 'investigating',
        createdAt: new Date().toISOString()
      }
    ];
    
    res.json({
      success: true,
      reports: mockReports
    });
  } catch (error) {
    console.error('Error obteniendo reportes:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo reportes'
    });
  }
});

module.exports = router;