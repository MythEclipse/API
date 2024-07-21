import mongoose from 'mongoose';
import config from '../config/environment';
import { logger } from './logger';

const connectDB = async (): Promise<void> => {
  mongoose.set('strictQuery', false);

  const dbUri = config.db;
  if (!dbUri) {
    logger.error('Database connection string is not defined in environment variables');
    process.exit(1);
  }

  try {
    logger.info('Database >> MongoDB is connecting...');
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    logger.info('Database >> MongoDB is ready!');
  } catch (err) {
    logger.error(`Failed to connect to MongoDB! Error: ${err}`);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    logger.error(`Database >> Failed to connect to MongoDB! Error: ${err}`);
    process.exit(1);
  });
};

export default connectDB;
