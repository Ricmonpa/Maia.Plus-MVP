const express = require('express');
const router = express.Router();

// GET /api/experiences
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    const mockExperiences = [
      {
        id: 1,
        name: 'Ruinas de Tulum',
        category: 'cultura',
        description: 'Sitio arqueológico maya con vista al mar',
        duration: 3,
        price: 85,
        rating: 4.8
      },
      {
        id: 2,
        name: 'Cenote Dos Ojos',
        category: 'naturaleza',
        description: 'Sistema de cenotes para snorkel',
        duration: 4,
        price: 350,
        rating: 4.9
      }
    ];
    
    const filtered = category 
      ? mockExperiences.filter(exp => exp.category === category)
      : mockExperiences;
    
    res.json({
      success: true,
      experiences: filtered
    });
  } catch (error) {
    console.error('Error obteniendo experiencias:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo experiencias'
    });
  }
});

module.exports = router;