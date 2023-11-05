import { Request, Response } from 'express'
import { fetchOrders, fetchOrdersByFilter } from '../api'
import { extractOrderDetail } from '../helpers'
import { ParamsDictionary } from 'express-serve-static-core'

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

  public async getOrders(req: Request, res: Response) {
    try {
      const limit = req.query.limit as string
      const start = req.query.start as string

      const allOrdersRes = await fetchOrders(limit, start)
      const { winstrom } = allOrdersRes.data
      const orders = winstrom['objednavka-prijata']

      const completeOrdersData = orders.map(orderDetail => ({
        ...extractOrderDetail(orderDetail),
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
