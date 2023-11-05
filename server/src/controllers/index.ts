import { Request, Response } from 'express'
import { fetchOrders, fetchOrder, fetchOrdersByFilter } from '../api'
import { extractOrderDetail } from '../helpers'
import { ParamsDictionary } from 'express-serve-static-core'

type OrdersInfo = {
  id: string
  kod: string
  sumCelkem: string
}

export class OrdersController {
  constructor() {
    this.getOrders = this.getOrders.bind(this)
  }

  public async getOrdersByFilter(
    req: Request<ParamsDictionary, object, { key: string; value: string }>,
    res: Response,
  ) {
    try {
      const { key, value } = req.body
      const filter = `(${key} like '${value}')`
      const { data } = await fetchOrdersByFilter(filter)
      const orders = data.winstrom['objednavka-prijata'].map(order => ({
        ...extractOrderDetail(order),
      }))

      res.send({
        total: data.winstrom['@rowCount'],
        orders,
      })
    } catch (error) {
      console.error({ error })
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  private getOrder = (order: OrdersInfo) =>
    fetchOrder(order.id)
      .then(res => res.data.winstrom['objednavka-prijata'][0])
      .catch(error => {
        console.error(
          `Error fetching data for object with id ${order.id}:`,
          (error as Error).message,
        )
        throw error
      })

  public async getOrders(req: Request, res: Response) {
    try {
      const limit = req.query.limit as string
      const start = req.query.start as string

      const allOrdersRes = await fetchOrders(limit, start)
      const { winstrom } = allOrdersRes.data
      const ordersInfo = winstrom['objednavka-prijata'].map(
        ({ id, kod, sumCelkem }) => ({
          id,
          kod,
          sumCelkem,
        }),
      )

      const ordersDetailPromises = ordersInfo.map(order => this.getOrder(order))

      const orderDetails = await Promise.all(ordersDetailPromises)
      const idMap: { [x: string]: (typeof ordersInfo)[0] } = {}
      ordersInfo.forEach(order => {
        idMap[order.id] = order
      })

      const completeOrdersData = orderDetails.map(orderDetail => ({
        ...extractOrderDetail(orderDetail),
        ...idMap[orderDetail.id],
      }))

      res.json({
        total: winstrom['@rowCount'],
        orders: completeOrdersData,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
