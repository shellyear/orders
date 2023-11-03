import axios from 'axios'
import { OrderDetailResponse, OrdersResponse } from '../types'

const BASE_URL = process.env.API_URL || 'https://demo.flexibee.eu/c/demo'
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const fetchAllOrders = () =>
  api.get<OrdersResponse>('/objednavka-prijata')

export const fetchOrder = (orderId: string) =>
  api.get<OrderDetailResponse>(`/objednavka-prijata/${orderId}`)
