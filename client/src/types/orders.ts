export type OrderType = {
    uzivatel: string;
    kod: string;
    kontaktJmeno: string;
    mesto: string;
    stat: string;
    ulice: string;
    psc: string;
    ic: string;
    dic: string;
    doprava: string;
    formaDopravy: string;
    formaUhrady: string;
    stav: string;
    fakturaLink?: string;
    sumCelkem: number;
    polozkyObchDokladu?: {
      kod: string; 
      nazev: string;
    }[]
}