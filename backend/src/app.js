import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import authRoutes from './routes/auth.routes.js' 

const app = express()

app.use(cors({
    origin: '*',
}))

app.use(morgan('dev'));
app.use(express.json())

app.use('/api', authRoutes)


export default app;