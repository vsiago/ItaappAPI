const mongoose = require('mongoose');

const connectDataBase = async () => {
  try {
    await mongoose.connect('mongodb+srv://vsiago21:9I6UHAP4AjyUoJt0@cluster0.jutvyn1.mongodb.net/Criapp')
    console.log('Conexao com o banco de dados estabelecida com sucesso')
  }
  catch (error) {
    console.error('Erro ao conectar ao banco de dados', error)
    throw error;
  }
}

module.exports = connectDataBase