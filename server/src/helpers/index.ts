import { OrderDetail } from '../types'

export function extractOrderDetail(orderDetail: OrderDetail) {
  const doesInvoiceExist = JSON.parse(orderDetail.faktSouhrn)
  const fakturaLink = doesInvoiceExist
    ? `https://demo.flexibee.eu/c/demo/objednavka-prijata/${orderDetail.id}.pdf`
    : undefined
  return {
    uzivatel: orderDetail['uzivatel@showAs'] || orderDetail.uzivatel,
    kontaktJmeno: orderDetail.kontaktJmeno,
    mesto: orderDetail.mesto,
    stat: orderDetail['stat@showAs'] || orderDetail.stat,
    ulice: orderDetail.ulice,
    psc: orderDetail.psc,
    ic: orderDetail.ic,
    dic: orderDetail.dic,
    doprava: orderDetail.doprava,
    formaDopravy:
      orderDetail['formaDopravy@showAs'] || orderDetail.formaDopravy,
    formaUhrady:
      orderDetail['formaUhradyCis@showAs'] || orderDetail.formaUhradyCis,
    stav: orderDetail['stavDoklObch@showAs'] || orderDetail.stavDoklObch,
    fakturaLink, // if has facture,
    polozkyObchDokladu:
      orderDetail.polozkyObchDokladu &&
      orderDetail.polozkyObchDokladu.map(row => ({
        kod: row.kod,
        nazev: row.nazev,
      })),
  }
}
