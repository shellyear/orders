/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  FetchOrdersByFilterArgs,
  fetchOrders,
  fetchOrdersByFilter,
} from "../api";
import { Paginator } from "../components/Paginator";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "../components/Select";
import { SearchBar } from "../components/SearchBar";
import { useMutation } from "../hooks";
import { OrdersTable } from "../components/OrdersTable";

const limit = 10;

function getTotal(ordersTotal?: number, ordersByFilterTotal?: number) {
  const total = Number(ordersTotal) || Number(ordersByFilterTotal);

  if (Number.isNaN(total)) {
    return 0;
  }

  return total;
}

function Orders() {
  const { pageNumber } = useParams();
  const [selected, setSelected] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()
  const {
    mutate: getOrders,
    status: ordersStatus,
    data: ordersData,
    reset: resetOrders,
  } = useMutation(
    ({ limit, skipAmount }: { limit: number; skipAmount: number }) =>
      fetchOrders(limit, skipAmount),
    {}
  );

  const {
    mutate: getOrdersByFilter,
    status: ordersByFilterStatus,
    data: ordersByFilterData,
    reset: resetFilteredOrders,
  } = useMutation(
    ({ limit, start, key, value }: FetchOrdersByFilterArgs) =>
      fetchOrdersByFilter({
        limit,
        start,
        key,
        value,
      }),
    {}
  );

  const currentPage = !Number.isNaN(Number(pageNumber))
    ? Number(pageNumber)
    : 1;
  const skipAmount = currentPage > 1 ? (currentPage - 1) * limit : 0;

  useEffect(() => {
    if (!selected) {
      resetFilteredOrders();
      getOrders({ limit, skipAmount });
    }
  }, [searchText, selected, skipAmount]);

  useEffect(() => {
    if (selected) {
      resetOrders();
      getOrdersByFilter({
        limit,
        start: skipAmount,
        key: selected,
        value: searchText,
      })
      navigate('/orders/1')
    }
  }, [searchText, selected, skipAmount]);

  const isLoading = [ordersStatus, ordersByFilterStatus].includes("loading");
  const orders = ordersData?.orders
    ? ordersData.orders
    : ordersByFilterData?.orders;
  const total = getTotal(ordersData?.total, ordersByFilterData?.total);

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Orders
      </h1>
      <div>total orders: {total}</div>
      <p>When no option is selected, orders are not filtered</p>
      <div className="flex justify-center mb-2">
        <Paginator total={total} limit={limit} currentPage={currentPage} />
      </div>
      <div className="flex flex-col justify-center w-full mb-4 gap-2">
        <Select selected={selected} setSelected={setSelected} />
        <SearchBar
          disabled={!Boolean(selected)}
          value={searchText}
          onChange={setSearchText}
        />
      </div>
      <OrdersTable orders={orders} isLoading={isLoading} />
    </div>
  );
}

export default Orders;
