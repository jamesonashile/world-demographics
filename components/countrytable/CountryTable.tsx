"use client";

import CountryTableRow from "./CountryTableRow";
import { useCountries } from "@/hooks/useCountries";

export default function CountryTable() {
  const { data: countries } = useCountries();

  if (!countries) return null;



  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Code</th>
          <th>Phase</th>
          <th>Shape</th>
          <th>Policy Score</th>
        </tr>
      </thead>

      {countries.map((c) => (
        <CountryTableRow
          country={c.name}
          key={c.code}
          phase={c.dividendPhase}
          shape={c.demographicShape}
          score={c.policyScore}
        />
      ))}
    </table>
  );
}

//need to map rows from supabase
