import { OrderType } from "../types/orders";

export function Order({ data }: { data: OrderType }) {
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
      <td className="border border-slate-300 flex flex-col">
        {data.polozkyObchDokladu?.map((polozka) => (
          <p>
            {polozka.kod}: {[polozka.nazev]}
          </p>
        ))}
      </td>
    </tr>
  );
}
