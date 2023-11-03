import axios from 'axios'
import { OrderDetailResponse, OrdersResponse } from '../types'

const BASE_URL = process.env.API_URL || 'https://demo.flexibee.eu/c/demo'
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const fetchAllOrders = (limit: string, start: string) => {
  const params = new URLSearchParams()
  params.append('limit', limit)
  params.append('start', start)
  params.append('add-row-count', 'true')
  return api.get<OrdersResponse>(`/objednavka-prijata?${params.toString()}`)
}

export const fetchOrder = (orderId: string) =>
  api.get<OrderDetailResponse>(`/objednavka-prijata/${orderId}`)
