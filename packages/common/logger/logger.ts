import winston, { format } from 'winston';
import { MongoDB } from 'winston-mongodb';
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new MongoDB({
      level: 'error',
      db: String(process.env.DB_URL),
      options: { useUnifiedTopology: true },
      collection: 'logs',
      format: format.combine(
        format.timestamp(),
        format.metadata(),
        format.printf((info) => {
          const data = `${info.timestamp} - ${info.level}: ${info.message} : ${info.metadata}`;
          return data;
        }),
      ),
    }),
  ],
});
export default logger;
