"use client";

import { useReducer, useMemo } from "react";
import CountryTableRow from "./CountryTableRow";
import { useCountries } from "@/hooks/useCountries";

type Columns = {
  column: string;
  scend: string;
};

type Dispatch = {
  type: string;
};

type Demographics = {
  name: string;
  code: string;
  dividendPhase: string;
  demographicShape: string;
  policyScore: number;
};

const initialState = { column: "name", scend: "Ascend" };

function reducer(state: Columns, action: Dispatch) {
  switch (action.type) {
    case "country ascend":
      return { column: "name", scend: "Ascend" };
    case "country descend":
      return { column: "name", scend: "Descend" };
    case "code ascend":
      return { column: "code", scend: "Ascend" };
    case "code descend":
      return { column: "code", scend: "Descend" };
    case "phase ascend":
      return { column: "dividendPhase", scend: "Ascend" };
    case "phase descend":
      return { column: "dividendPhase", scend: "Descend" };
    case "shape ascend":
      return { column: "demographicShape", scend: "Ascend" };
    case "shape descend":
      return { column: "demographicShape", scend: "Descend" };
    case "policy ascend":
      return { column: "policyScore", scend: "Ascend" };
    case "policy descend":
      return { column: "policyScore", scend: "Descend" };
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

    const cloned = [...countriesRaw];
    const col = columnSort.column as keyof Demographics;
    const dir = columnSort.scend;


    cloned.sort((a, b) => {
      const valA = a[col].toString();
      const valB = b[col].toString();
      return dir === "Ascend" ? valA.localeCompare(valB, undefined, {sensitivity: "base"}) : valB.localeCompare(valA, undefined, {sensitivity: "base"})
    });
    return cloned
  }, [countriesRaw, columnSort]);

 

  
  

  function handleColumnSort(column: keyof Demographics, key: string) {
    
    if (columnSort.column === column && columnSort.scend === "Ascend") {
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


