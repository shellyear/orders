import axios from 'axios'
import {
  OrderDetailResponse,
  OrdersByFilterResponse,
  OrdersResponse,
} from '../types'
import { OrdersPayload } from '../controllers'

const BASE_URL = process.env.API_URL || 'https://demo.flexibee.eu/c/demo'
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

const detail =
  'custom:kod,uzivatel,kontaktJmeno,mesto,stat,ulice,psc,ic,dic,sumCelkem,faktSouhrn,formaDopravy,formaUhradyCis,stav,polozkyObchDokladu(nazev,kod)'

export const fetchOrders = (limit: string, start: string) => {
  const params = new URLSearchParams()
  params.append('limit', limit)
  params.append('start', start)
  params.append('detail', detail)
  params.append('add-row-count', 'true')
  console.log({ URL: `${BASE_URL}/objednavka-prijata?${params.toString()}` })
  return api.get<OrdersResponse>(`/objednavka-prijata?${params.toString()}`)
}

type FetchOrdersByFilterArgs = OrdersPayload

export const fetchOrdersByFilter = ({
  key,
  value,
  limit,
  start,
}: FetchOrdersByFilterArgs) => {
  const filter = `(${key} like similar '${value}')`
  const payload = JSON.stringify({
    winstrom: {
      filter,
      detail,
      limit,
      start,
    },
  })
  const params = new URLSearchParams()
  params.append('add-row-count', 'true')
  console.log('fetchOrdersByFilter', {
    URL: `/objednavka-prijata/query.json?${params.toString()}`,
  })
  return api.post<OrdersByFilterResponse>(
    `/objednavka-prijata/query.json?${params.toString()}`,
    payload,
  )
}
