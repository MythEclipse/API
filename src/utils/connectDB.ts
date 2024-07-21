import mongoose from 'mongoose'
import config from '../config/environment'
import { logger } from './logger'

mongoose.connect(`${config.db}`).then(() => {
  logger.info('Connected to MongoDB')
}).catch((error) => {
  logger.error('Error connecting to MongoDB:', error.message)
})
