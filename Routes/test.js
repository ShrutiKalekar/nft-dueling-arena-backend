
const express = require('express');
const { getDB } = require('../db/mongo');

const userRoutes = express.Router();
const db = getDB();

userRoutes.get('/', async (req, res) => {
  res.send('Hello! Welcome to my API.');
});

userRoutes.get('/google', async(req,res) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ header: 'google' });
    if (!user) {
      return res.status(404).json({ message: 'User not found with header "google"' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

userRoutes.get('/yahoo', async (req, res) => {
  try {
    const db = getDB();
    const newData = { header: 'yahoo', data: 'yes' };
    await db.collection('users').insertOne(newData);
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = userRoutes;
