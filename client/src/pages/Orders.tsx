import { useEffect, useMemo, useState } from "react";
import { OrderType } from "../types/orders";
import { fetchOrders } from "../api";
import { Order } from "../components/Order";
import { Paginator, usePagination } from "../components/Paginator";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

const tableHeaderItems = [
  "Uzivatel",
  "kod",
  "kontaktJmeno",
  "Facturacni udaje",
  "Forma dopravy",
  "Zpusob Platby",
  "Stav",
  "Celkova cena",
  "Faktura",
  "Vsechny polozky (kod, nazev)",
];

function Orders() {
  const { pageNumber } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>();
  const { total, limit, setTotal } = usePagination(5);

  const currentPage = !Number.isNaN(Number(pageNumber))
    ? Number(pageNumber)
    : 1;

  useEffect(() => {
    const skipAmount = currentPage > 1 ? (currentPage - 1) * limit : 0;
    setIsLoading(true);
    fetchOrders(limit, skipAmount)
      .then(({ data: { orders, total } }) => {
        setOrders(orders);
        setTotal(total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error fetching orders data:", err);
      });
  }, [currentPage, limit, setTotal]);

  const TableHeaderItems = useMemo(
    () =>
      tableHeaderItems.map((title) => (
        <th key={title} className="border border-slate-300">
          {title}
        </th>
      )),
    []
  );

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Orders
      </h1>
      <div className="flex justify-center mb-2">
        <Paginator total={total} limit={limit} currentPage={currentPage} />
      </div>
      <table className="table-auto border-collapse border border-slate-400">
        <thead>
          <tr>{TableHeaderItems}</tr>
        </thead>
        {!isLoading ? (
          <tbody>
            {orders &&
              orders.map((order, i) => {
                return <Order key={order.kod} data={order} />;
              })}
          </tbody>
        ) : (
          <LoadingSpinner />
        )}
      </table>
    </div>
  );
}

export default Orders;
