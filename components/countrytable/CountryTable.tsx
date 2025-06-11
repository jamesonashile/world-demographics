"use client";

import CountryTableRow from "./CountryTableRow";
import { useCountries } from "@/hooks/useCountries";

export default function CountryTable() {
  const { data: countries } = useCountries();

  if (!countries) return null;



  return (
    <div className="overflow-auto max-h-[95vh] rounded border border-gray-200 shadow-sm mt-[5vh]">
      <table className="min-w-full divide-y-1 divide-gray-100">
        <thead className="ltf:text-left rtl:text-right sticky top-0 bg-white z-10">
          <tr className=" *:font-medium *:text-gray-900 ">
            <th className="px-3 py-2 whitespace-nowrap text-left">Country</th>
            <th className="px-3 py-2 whitespace-nowrap text-left">Code</th>
            <th className="px-3 py-2 whitespace-nowrap text-left">Phase</th>
            <th className="px-3 py-2 whitespace-nowrap text-left">Shape</th>
            <th className="px-3 py-2 whitespace-nowrap text-left">Policy Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 *:odd:bg-gray-200 ">
          {countries.map((c) => (
            <CountryTableRow
              country={c.name}
              key={c.code}
              code={c.code}
              phase={c.dividendPhase}
              shape={c.demographicShape}
              score={c.policyScore}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

//need to map rows from supabase
