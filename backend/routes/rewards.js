const express = require('express');
const router = express.Router();

// GET /api/rewards/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock data
    const userRewards = {
      points: 150,
      level: 'Bronze',
      totalEarned: 150,
      totalSpent: 0
    };
    
    res.json({
      success: true,
      rewards: userRewards
    });
  } catch (error) {
    console.error('Error obteniendo recompensas:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo recompensas'
    });
  }
});

// GET /api/rewards/offers
router.get('/offers', async (req, res) => {
  try {
    const mockOffers = [
      {
        id: 1,
        title: '10% Descuento Posada Margherita',
        description: 'Descuento en restaurante verificado',
        points: 100,
        business: 'Posada Margherita'
      }
    ];
    
    res.json({
      success: true,
      offers: mockOffers
    });
  } catch (error) {
    console.error('Error obteniendo ofertas:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo ofertas'
    });
  }
});

module.exports = router;