import express from 'express'
import cors from 'cors'
import { extractOrderDetail } from './helpers'
import { fetchAllOrders, fetchOrder } from './api'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())

app.get('/orders', async (req, res) => {
  try {
    const response = await fetchAllOrders()
    const { winstrom } = response.data
    const ordersInfo = winstrom['objednavka-prijata'].map(
      ({ id, kod, sumCelkem }) => ({
        id,
        kod,
        sumCelkem,
      }),
    )

    const ordersDetailPromises = ordersInfo.map(order =>
      fetchOrder(order.id)
        .then(res => res.data.winstrom['objednavka-prijata'][0])
        .catch(error => {
          console.error(
            `Error fetching data for object with id ${order.id}:`,
            (error as Error).message,
          )
          throw error
        }),
    )

    const orderDetails = await Promise.all(ordersDetailPromises)
    const idMap: { [x: string]: (typeof ordersInfo)[0] } = {}
    ordersInfo.forEach(order => {
      idMap[order.id] = order
    })

    const completeOrdersData = orderDetails.map(orderDetail => ({
      ...extractOrderDetail(orderDetail),
      ...idMap[orderDetail.id],
    }))

    res.json(completeOrdersData)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log('Server listening on port ', port)
})
