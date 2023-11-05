import { Dispatch, SetStateAction } from "react";

const options = [
  {
    key: '',
    value: 'Select an option'
  },
  {
    key: "uzivatel.kod",
    value: "Uživatel",
  },
  {
    key: "kod",
    value: "Kod"
  },
  {
    key: "kontaktJmeno",
    value: 'Kontakt jmeno'
  },
  {
    key: "mesto",
    value: "Mesto"
  },
  {
    key: "stat.nazev",
    value: "Stat"
  },
  {
    key: "ulice",
    value: "Ulice"
  },
  {
    key: "psc",
    value: "psc"
  },
  {
    key:   "ic",
    value:   "ic"
  },
  {
    key: "dic",
    value: "dic"
  },
  {
    key: "doprava",
    value: "doprava"
  },
  {
    key: "formaDopravy.nazev",
    value: "Forma dopravy"
  },
  {
    key: "formaUhradyCis.nazev",
    value: "Forma uhrady"
  },
  {
    key: "stavDoklObch.kod",
    value: "Stav"
  },
  {
    key: "sumCelkem",
    value: "Celkova cena"
  }
];

type SelectProps = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export const Select = ({ selected, setSelected }: SelectProps) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select to search by
      </label>
      <select
        id="countries"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option, i) => (
          <option key={i} value={option.key} selected={selected === option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
