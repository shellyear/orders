import React from "react";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to Ilico app
      </h1>
      <div className="mb-2">
        <p>
          Make sure that the app fullfills the following conditions. See{" "}
          <Link
            to="/orders"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Orders
          </Link>
        </p>
      </div>
      <p>
        Napište aplikaci, která si bude stahovat data o objednávkách, a
        fakturách k nim navázaných z demo API Flexibee.
        https://www.flexibee.eu/api/demo-flexibee-eu/ Tyto objednávky se
        následně vykreslí do tabulky. Povinné sloupečky jsou uživatel, kód,
        kontaktJmeno, fakturační údaje (město, stát, ulice, psč, ič, dič), forma
        dopravy, způsob platby, stav, všechny položky (kód, název), celková cena
        objednávky a faktura (pokud je). Faktura se musí dát stáhnout (pokud je
        v objednávce obsažena). Aplikace musí mít FrontEnd i backend, přičemž
        Frontend je psán v reactu a backend v nodejs + express. Nad objednávkami
        je možné fulltextově vyhledávat nad všemi údaji, objednávky jsou
        stránkované (při každém vyhledání nebo posunutí ve stránkování se musí
        provést query na backend).
      </p>
    </div>
  );
};
