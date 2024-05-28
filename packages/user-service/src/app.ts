import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectDatabase from './config/index';
import router from './routes';
import userService from './grpc-server/userService';
import createRoomServiceClient from '../src/grpc-server/client';
connectDatabase();
userService();
createRoomServiceClient();
const app = express();
app.use(bodyParser.json());
app.use('/api/user', router);
const PORT = process.env.USER_SERVICE_PORT;
app.listen(PORT, () => {
  console.info(`user service running on port ${PORT}`);
});
