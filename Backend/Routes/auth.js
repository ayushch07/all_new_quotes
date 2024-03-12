const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Enable CORS (replace * with your frontend URL in production)
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to register a user in the DB
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = new User({ email, username });
    const newUser = await User.register(user, password);

    // Send a JSON response for successful registration
    res.json({ success: true, message: 'Welcome, you are registered successfully' });
  } catch (e) {
    // Send a JSON response for registration failure
    res.status(400).json({ success: false, message: e.message });
  }
});

// Route to actually login via the DB
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (!user) {
        // Invalid login
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      // Successful login
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
  
        // Send a JSON response for successful login
        res.json({ success: true, message: 'Welcome back' });
      });
    })(req, res, next);
  });
  
  // Route to logout
  router.get('/logout', (req, res) => {
    req.logout();
  
    // Send a JSON response for successful logout
    res.json({ success: true, message: 'Goodbye friends, see you again' });
  });
  
  module.exports = router;