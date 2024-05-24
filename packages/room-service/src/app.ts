import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDatabase from './config/index'
import router from './routes'
import '../src/grpc-client/server';
connectDatabase()
const app = express()
app.use(bodyParser.json())
app.use('/api/room', router)
const PORT = process.env.ROOM_SERVICE_PORT
app.listen(PORT, () => {
  console.log(`room service running on port ${PORT}`)
})
