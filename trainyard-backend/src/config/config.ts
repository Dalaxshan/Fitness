import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10),
  api: {
    apiUrl: process.env.API_URL,
    httpTimeout: 1000,
  },
  mongodb: {
    database: {
      connectionString: process.env.MONGODB_CONNECTION_STRING,
      databaseName: process.env.MONGODB_DB_NAME,
    },
  },
});
