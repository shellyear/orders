import { useEffect, useMemo, useState } from "react";
import { OrderType } from "./types/orders";
import { fetchOrders } from "./api";

function Order({ data }: { data: OrderType }) {
  return (
    <tr>
      <td className="border border-slate-300">{data.uzivatel}</td>
      <td className="border border-slate-300">{data.kod}</td>
      <td className="border border-slate-300">{data.kontaktJmeno}</td>
      <td className="border border-slate-300">
        <p>
          Mesto: {data.stat}; Stat: {data.stat}; Ulice: {data.ulice}; PSC:{" "}
          {data.psc}; IC: {data.ic}; DIC: {data.dic}
        </p>
      </td>
      <td className="border border-slate-300">{data.formaDopravy}</td>
      <td className="border border-slate-300">{data.formaUhrady}</td>
      <td className="border border-slate-300">{data.stav}</td>
      <td className="border border-slate-300">{data.sumCelkem}</td>
      <td className="border border-slate-300">
        {data.fakturaLink ? (
          <a
            href={data.fakturaLink}
            download={`faktura.${data.kod}.pdf`}
            className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Stahnout fakturu
          </a>
        ) : (
          "Zadna faktura"
        )}
      </td>
      <td className="border border-slate-300">
        Vsechny polozky:{" "}
        {data.polozkyObchDokladu?.map((polozka) => (
          <p>
            {polozka.kod}: {[polozka.nazev]}
          </p>
        ))}
      </td>
    </tr>
  );
}

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
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    fetchOrders()
      .then(({ data }) => setOrders(data))
      .catch((err) => console.error("Error fetching orders data:", err));
  }, []);

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
      <h2>Orders</h2>
      <table className="table-auto border-collapse border border-slate-400">
        <thead>
          <tr>{TableHeaderItems}</tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return <Order data={order} />;
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
