const express = require('express');
const UserModel = require('../models/user.model')

const User = express.Router()

// GET ALL USERS
User.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 })

    res.json(users)

  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar usarios no banco de dados')
  }
})

// POST USER
User.post('/criar-usuario', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: "Email ou username ja existe" })
    }

    // Criar um novo usuário usando o modelo
    const novoUsuario = new UserModel({
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
User.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado" })
    }

    user.password = newPassword;
    const usuarioAtualizado = await user.save();

    res.json({ message: "Senha do usuairio alterada com sucesso", user: usuarioAtualizado })
  } catch (error) {
    console.error('Erro ao alterar a senha do usuario', error);
    res.status(500).send('Erro interno no servidor')
  }
})


User.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Encontrar e deletar o usuário pelo ID
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso', user: deletedUser });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = User