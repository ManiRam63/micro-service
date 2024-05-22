import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/index'
import dotenv from 'dotenv'
import connectDatabase from './config'
dotenv.config()
import './grpc-server/userService'
const PORT = process.env.USER_SERVICE_PORT
connectDatabase()
const app = express()
app.use(bodyParser.json())
app.use('/api/user', userRoutes)
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`)
})
