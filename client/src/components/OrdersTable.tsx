import React, { useMemo } from "react";
import { OrdersResponse } from "../types/orders";
import { Order } from "./Order";
import { LoadingSpinner } from "./LoadingSpinner";

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

type OrdersTableProps = {
  isLoading: boolean;
  orders?: OrdersResponse["orders"];
};

export const OrdersTable = ({ orders, isLoading }: OrdersTableProps) => {
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
        <tbody>
          <tr>
            <td>
              <LoadingSpinner />
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};
