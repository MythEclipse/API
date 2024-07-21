import express from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'

import './utils/connectDB'

const app = express()
const port: number = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use((req, res, next) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-methods', '*')
  res.setHeader('access-control-allow-headers', '*')
  next()
})

routes(app)

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})
