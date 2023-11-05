import express from 'express'
import cors from 'cors'
import { OrdersController } from './controllers'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

const orders = new OrdersController()

app.get('/orders', orders.getOrders)
app.post('/orders', orders.getOrdersByFilter)

app.listen(port, () => {
  console.log('Server listening on port ', port)
})
