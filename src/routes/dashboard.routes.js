const express = require('express')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/authMiddleware')

const Dashboard = express.Router();

Dashboard.get('/dashboard', verifyToken, (req, res) => {
  // O usuario que esta autenticado pode acessar esta rota
  res.json({ message: "Rota protegida com sucesso", user: req.user })
})

module.exports = Dashboard