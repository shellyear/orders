export type OrdersResponse = {
  winstrom: {
    '@version': string
    '@rowCount': string // number in fact
    'objednavka-prijata': OrderDetail[]
  }
}

export type OrderDetail = {
  'external-ids': [string]
  id: string // 418
  uzivatel: string
  'uzivatel@showAs': string
  kod: string
  sumCelkem: string
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

export type OrdersByFilterResponse = {
  winstrom: {
    '@version': string
    'objednavka-prijata': OrderDetail[]
    '@rowCount': string
  }
}
