import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

import * as middleware from './middleware'

import articlesRouter from './routers/articles.router'

// Very important when deploying on Google App Engin
const PORT = process.env.PORT ?? 8080
const ENV = process.env.NODE_ENV ?? 'production'

const app: Express = express()

app.use(helmet())

app.use(cors())

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json())

app.use(middleware.httpLogger)

app.get('/', (_req, res) => {
  res.send('Hello World! This is Node-Express A.')
})

app.get('/ping', (_req, res) => {
  res.send('Pong 🏓 ')
})

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Articles routes

app.use('/articles', articlesRouter)

// Error hanlding middleware

app.use(middleware.errorHandler)

app.use(middleware.notFoundHandler)

const server = app.listen(PORT, () => {
  return console.log(`Express server running in ${ENV} env | Listening at http://localhost:${PORT}`)
})

export { app as default, server }
