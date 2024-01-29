const express = require('express');
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');


const Login = express.Router();

Login.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username }, {})

    if (user && user.password === password) {
      // Gerar token JWT
      const token = jwt.sign({ userId: user._id }, 'suaChaveSecreta', { expiresIn: '1h' });

      res.status(201).json({ user: { _id: user._id, username: user.username, email: user.email }, token });
    } else {
      res.status(401).json({ message: 'Usuário e senha não correspondem' });
    }

  } catch (error) {
    res.status(401).json({ "message": "Error ao encontrar no banco de dados" })
  }
})

module.exports = Login