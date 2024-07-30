import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

import * as middleware from './middleware'

import articlesRouter from './routers/articles.router'

// Very important when deploying on Google App Engin
const PORT = process.env.PORT ?? 8080
const ENV = process.env.NODE_ENV ?? 'production'

const app: Express = express()

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(middleware.httpLogger)

app.get('/', (_req, res) => {
  res.send('Hello World! This is Node-Express AP.')
})

app.get('/ping', (_req, res) => {
  res.send('Pong 🏓 ')
})

// Articles routes

app.use('/articles', articlesRouter)

// Error hanlding middleware

app.use(middleware.errorHandler)

app.use(middleware.notFoundHandler)

const server = app.listen(PORT, () => {
  return console.log(`Express server running in ${ENV} env | Listening at http://localhost:${PORT}`)
})

export { app as default, server }
