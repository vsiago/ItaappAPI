const express = require('express');
const app = express();

app.use(express.json())

const Users = require('../routes/user.routes')

app.use(Users)

module.exports = app