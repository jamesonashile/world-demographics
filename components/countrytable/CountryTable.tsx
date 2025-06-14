"use client";

import React, { useReducer, useMemo } from "react";
import CountryTableRow from "./CountryTableRow";
import { useCountries } from "@/hooks/useCountries";
import { sortCountries } from "@/lib/sortCountries";

type SortKey = "country" | "code" | "phase" | "shape" | "policy";

type SortDirection = "ascend" | "descend";

type Demographics = {
  name: string;
  code: string;
  dividendPhase: string;
  demographicShape: string;
  policyScore: number;
};

type Initial = {
  column: keyof Demographics;
  scend: SortDirection;
};

type SortAction =
  | "country ascend"
  | "country descend"
  | "code ascend"
  | "code descend"
  | "phase ascend"
  | "phase descend"
  | "shape ascend"
  | "shape descend"
  | "policy ascend"
  | "policy descend";

type Dispatch = {
  type: SortAction;
};



const initialState: Initial = { column: "name", scend: "ascend" };

function reducer(state: Initial, action: Dispatch): Initial {
  switch (action.type) {
    case "country ascend":
      return { column: "name", scend: "ascend" };
    case "country descend":
      return { column: "name", scend: "descend" };
    case "code ascend":
      return { column: "code", scend: "ascend" };
    case "code descend":
      return { column: "code", scend: "descend" };
    case "phase ascend":
      return { column: "dividendPhase", scend: "ascend" };
    case "phase descend":
      return { column: "dividendPhase", scend: "descend" };
    case "shape ascend":
      return { column: "demographicShape", scend: "ascend" };
    case "shape descend":
      return { column: "demographicShape", scend: "descend" };
    case "policy ascend":
      return { column: "policyScore", scend: "ascend" };
    case "policy descend":
      return { column: "policyScore", scend: "descend" };
    default:
      throw new Error(`Unknown action: ${state} ${action.type}`);
  }
}



export default function CountryTable() {
  const { data } = useCountries();
  const countriesRaw = data as Demographics[] | undefined;

  const [columnSort, dispatch] = useReducer(reducer, initialState);

  const sortedCountries = useMemo(()=>{
    if (!countriesRaw) return [];

   return sortCountries(countriesRaw, columnSort)
    
  }, [countriesRaw, columnSort]);

 

  
  

  function handleColumnSort(column: keyof Demographics, key: SortKey) {
    if (columnSort.column === column && columnSort.scend === "ascend") {
      dispatch({ type: `${key} descend` });
    } else {
      dispatch({ type: `${key} ascend` });
    }
  }

  return (
    <div className="overflow-auto max-h-[95vh] rounded border border-gray-200 shadow-sm mt-[5vh]">
      <table className="min-w-full divide-y-1 divide-gray-100">
        <thead className="ltf:text-left rtl:text-right sticky top-0 bg-white z-10">
          <tr className=" *:font-semibold *:text-gray-900 ">
            <th
              className="px-3 py-2 whitespace-nowrap text-left hover:bg-blue-200"
              onClick={() => handleColumnSort("name", "country")}
            >
              Country
            </th>
            <th
              className="px-3 py-2 whitespace-nowrap text-left hover:bg-blue-200"
              onClick={() => handleColumnSort("code", "code")}
            >
              Code
            </th>
            <th
              className="px-3 py-2 whitespace-nowrap text-left hover:bg-blue-200"
              onClick={() => handleColumnSort("dividendPhase", "phase")}
            >
              Phase
            </th>
            <th
              className="px-3 py-2 whitespace-nowrap text-left hover:bg-blue-200"
              onClick={() => handleColumnSort("demographicShape", "shape")}
            >
              Shape
            </th>
            <th
              className="px-3 py-2 whitespace-nowrap text-left hover:bg-blue-200"
              onClick={() => handleColumnSort("policyScore", "policy")}
            >
              Policy Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 *:odd:bg-gray-200 ">
          {sortedCountries.map((c) => (
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


