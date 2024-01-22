const express = require('express');
const userSchema = require('../models/user.model')

const User = express.Router()
// GET ALL USERS
User.get('/users', (req, res) => {
  res.json({ "message": "Buscar todos os usuarios /users" })
})

// GET USER ID
User.get('/user/:id', (req, res) => {
  res.json({ "message": "Buscar por um usuario especifico" })
})

// POST USER
User.post('/criar-usuario', async (req, res) => {
  try {
    console.log('chegou aqui')
    const { username, email, password, role } = req.body;

    // Criar um novo usuário usando o modelo
    const novoUsuario = new userSchema({
      username,
      email,
      password,
      role
    });

    // Salvar o usuário no banco de dados
    const usuarioSalvo = await novoUsuario.save();

    res.status(201).json(usuarioSalvo);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).send('Erro interno do servidor');
  }
});


// PUT USER
User.put('/user/:id', (req, res) => {
  res.json({ "message": "Editar um usuario especifico" })
})

User.delete('/user/:id', (req, res) => {
  res.json({ "message": "Deletar um usuario especifico" })
})

module.exports = User