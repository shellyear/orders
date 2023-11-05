import axios from 'axios'
import {
  OrderDetailResponse,
  OrdersByFilterResponse,
  OrdersResponse,
} from '../types'

const BASE_URL = process.env.API_URL || 'https://demo.flexibee.eu/c/demo'
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const fetchOrders = (limit: string, start: string) => {
  const params = new URLSearchParams()
  params.append('limit', limit)
  params.append('start', start)
  params.append('add-row-count', 'true')
  console.log({ URL: `${BASE_URL}/objednavka-prijata?${params.toString()}` })
  return api.get<OrdersResponse>(`/objednavka-prijata?${params.toString()}`)
}

export const fetchOrder = (orderId: string) =>
  api.get<OrderDetailResponse>(`/objednavka-prijata/${orderId}`)

export const fetchOrdersByFilter = (filter: string) => {
  const detail =
    'custom:kod,uzivatel,kontaktJmeno,mesto,stat,ulice,psc,ic,dic,sumCelkem,faktSouhrn,formaDopravy,formaUhradyCis,stav,polozkyObchDokladu(nazev,kod)'
  const payload = {
    winstrom: {
      filter,
      detail,
    },
  }
  const params = new URLSearchParams()
  params.append('add-row-count', 'true')
  console.log('fetchOrdersByFilter', {
    URL: `/objednavka-prijata/query.json?${params.toString()}`,
  })
  return api.post<OrdersByFilterResponse>(
    `/objednavka-prijata/query.json?${params.toString()}`,
    JSON.stringify(payload),
  )
}
