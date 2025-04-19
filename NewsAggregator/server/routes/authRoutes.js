// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
