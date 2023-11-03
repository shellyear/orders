import axios from "axios";
import { OrderType } from "../types/orders";

const BASE_URL = process.env.API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export const fetchOrders = () => api.get<OrderType[]>("/orders")
