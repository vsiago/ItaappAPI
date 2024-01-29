const app = require('./server/server')
const connectDataBase = require('./server/db')
connectDataBase()

app.listen('3000', () => {
  console.log('app rodando na porta 3000')
})
