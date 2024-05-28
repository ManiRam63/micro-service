import mongoose from 'mongoose';
import logger from '../../../common/logger/logger';
import { ResponseMessage } from '../../../common/utils/responseMessage';
export default async function connectDatabase(): Promise<void> {
  const db = process.env.DB_URL;
  mongoose.set('strictQuery', false);
  mongoose
    .connect(db)
    .then(() => {
      console.log(ResponseMessage.COMMON.DB_SUCCESS);
    })
    .catch((err) => {
      logger.error(ResponseMessage.COMMON.DB_ERROR, {
        meta: err,
      });
    });
}
