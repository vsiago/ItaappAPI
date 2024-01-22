const app = require('./server/server')
const mongoose = require('mongoose')
const connectDataBase = require('./server/db')

app.listen('3000', () => {
  console.log('app rodando na porta 3000')
})

connectDataBase()