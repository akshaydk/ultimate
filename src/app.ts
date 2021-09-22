import './init'
import express from 'express'
import helmet from 'helmet'

const app = express()
app.use(helmet)
app.use(express.json())
// app.use(mysql.connect)

// app.use(mysql.close)
export default app