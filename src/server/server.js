const express = require('express');
const app = express();

const Users = require('../routes/user.routes')

app.use(Users)

module.exports = app