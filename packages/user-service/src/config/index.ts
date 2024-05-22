import mongoose from 'mongoose'
import logger from '../logger/logger'

export default async function connectDatabase(): Promise<void> {
  const db = process.env.DB_URL
  mongoose.set('strictQuery', false)
  mongoose
    .connect(db)
    .then(() => {
      console.log('Database Connected Successfully!!')
    })
    .catch((err) => {
      logger.error('Could not connect to the database', {
        meta: err,
      })
    })
}
