import express from 'express'
import Controller from '../controllers/intent'

const BASE_PATH = '/api/v1'

const app = express()
const controller = new Controller()

app.get(`${BASE_PATH}/intent`, controller.intent)

export default app