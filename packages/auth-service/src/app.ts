import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDatabase from './config/index'
import router from './routes'
const PORT = process.env.AUTH_SERVICE_PORT
connectDatabase()
const app = express()
app.use(bodyParser.json())
app.use('/api', router)
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`)
})
