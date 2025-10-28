const express = require('express');
const router = express.Router();

// GET /api/prices/check
router.get('/check', async (req, res) => {
  try {
    const { service, price } = req.query;
    
    // Mock data para demo
    const mockPrices = {
      'tour cenotes': { min: 800, max: 1200, avg: 1000 },
      'taxi ruinas': { min: 150, max: 200, avg: 175 },
      'restaurant': { min: 200, max: 500, avg: 350 }
    };
    
    const serviceKey = service?.toLowerCase() || 'restaurant';
    const priceData = mockPrices[serviceKey] || mockPrices['restaurant'];
    
    const reportedPrice = parseInt(price) || 0;
    let analysis = 'fair';
    
    if (reportedPrice > priceData.max * 1.2) {
      analysis = 'abusive';
    } else if (reportedPrice > priceData.avg * 1.1) {
      analysis = 'high';
    }
    
    res.json({
      success: true,
      service: service || 'Servicio General',
      priceData,
      reportedPrice,
      analysis
    });
  } catch (error) {
    console.error('Error verificando precios:', error);
    res.status(500).json({
      success: false,
      error: 'Error verificando precios'
    });
  }
});

// POST /api/prices/report
router.post('/report', async (req, res) => {
  try {
    const { service, price, location, description } = req.body;
    
    // TODO: Guardar reporte en base de datos
    console.log('Reporte de precio recibido:', { service, price, location, description });
    
    res.json({
      success: true,
      message: 'Reporte enviado correctamente',
      reportId: Date.now()
    });
  } catch (error) {
    console.error('Error reportando precio:', error);
    res.status(500).json({
      success: false,
      error: 'Error enviando reporte'
    });
  }
});

module.exports = router;