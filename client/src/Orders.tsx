import React, { useEffect, useState } from "react"

// https://demo.flexibee.eu/c/demo/objednavka-prijata/360
// https://demo.flexibee.eu/c/demo/objednavka-prijata/360.pdf

type OrderData = {
  uživatel: string
  kod: string
  kontaktJmeno: string
  mesto: string
  stat: string
  ulice: string
  psc: string
  ic: string
  dic: string
  doprava: string
  formaDopravy: string
  formaUhradyCis: string
  stavDoklObch: string
  faktSouhrn: boolean // if has facture
  typDoklNabFak: string // type factura // not needed
  polozkyObchDokladu: {
    kod: string // PPL or CMSX
    cenaMj: number
    sumCelkem: number
    nazev: string // platba prevodem etc |CMS vyrobek 1
  }[]
}

function Order({ data }: { data: OrderData }) {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  )
}

function Orders() {
  const [orders, setOrders] = useState<OrderData[]>()

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <h2>Orders</h2>
      <table>
        <tr>
          <th>Uzivatel</th>
          <th>Kod</th>
          <th>kontaktJmeno</th>
          <th>Facturacni udaje</th>
          <th>Forma dopravy</th>
          <th>Zpusob platby</th>
          <th>Stav</th>
          <th>Kod, Nazev</th>
          <th>Celkova cena</th>
          <th>Faktura</th>
        </tr>
        {orders && orders.map((o) => {
          return <Order data={o} />
        })}
      </table>
    </div>
  );
}

export default Orders;
