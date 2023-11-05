import axios from "axios";
import { OrdersResponse } from "../types/orders";

const BASE_URL = process.env.API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export type FetchOrdersByFilterArgs = {
  key: string;
  value: string;
  limit: number;
  start: number;
};

export const fetchOrders = (limit: number, start: number) => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("start", start.toString());

  return api
    .get<OrdersResponse>(`/orders?${params.toString()}`)
    .then((res) => res.data);
};

export const fetchOrdersByFilter = (args: FetchOrdersByFilterArgs) => {
  return api
    .post<OrdersResponse>(`/orders`, { ...args })
    .then((res) => res.data);
};
