const express = require('express');
const app = express();

app.use(express.json())

const Users = require('../routes/user.routes')
const Login = require('../routes/login.routes')
const Dashboard = require('../routes/dashboard.routes')

app.use(Users)
app.use(Login)
app.use(Dashboard)

module.exports = app