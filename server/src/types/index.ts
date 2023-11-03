export type OrderData = {
  'external-ids'?: [string] // ['ext:OBP-ESHOP:991000001']
  id: string // 418
  lastUpdate: string // '2022-06-22T07:03:07.841+02:00'
  kod: string // '210800001'
  datVyst: string // '2021-08-06+02:00'
  sumCelkem: string // '1429.0'
  sumCelkemMen: string // '0.0'
  mena: string //  'code:CZK'
  'mena@ref': string // '/c/demo/mena/31'
  'mena@showAs': string // 'CZK: Česká koruna'
  firma: string
  popis: string // 'Objednavka z eshopu č. 210800001'
}

export type OrdersResponse = {
  winstrom: {
    '@version': string
    'objednavka-prijata': OrderData[]
  }
}

export type OrderDetail = {
  'external-ids': [string]
  id: string // 418
  uzivatel: string
  'uzivatel@showAs': string
  kod: string
  kontaktJmeno: string
  mesto: string
  stat: string // 'code:CZ'
  'stat@showAs': string // 'Česká republika'
  ulice: string
  faUlice: string
  psc: string
  ic: string
  dic: string
  doprava: ''
  formaDopravy: string
  'formaDopravy@showAs': string
  formaUhradyCis: string
  'formaUhradyCis@showAs': string
  stavDoklObch: string
  'stavDoklObch@showAs': string
  faktSouhrn: string // 'true'
  typDoklNabFak: string
  'typDoklNabFak@showAs': string
  polozkyObchDokladu: {
    'external-ids': [string]
    kod: 'CMS-X1'
    nazev: 'CMS výrobek 1'
  }[]
}

export type OrderDetailResponse = {
  winstrom: {
    '@version': string
    'objednavka-prijata': [OrderDetail]
  }
}
