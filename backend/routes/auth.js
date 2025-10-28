const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Implementar autenticación real
    res.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: '1',
        email: email,
        name: 'Usuario Demo'
      },
      token: 'demo_token_123'
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      error: 'Error en autenticación'
    });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    // TODO: Implementar registro real
    res.json({
      success: true,
      message: 'Registro exitoso',
      user: {
        id: '1',
        email: email,
        name: name
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      error: 'Error en registro'
    });
  }
});

module.exports = router;