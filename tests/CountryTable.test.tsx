import React from "react";
import { it, describe, expect, vi } from "vitest";
import { sortCountries } from "@/lib/sortCountries";
import CountryTable, {reducer} from "@/components/countrytable/CountryTable";
import {render, screen} from "@testing-library/react"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function renderWithClient(ui: React.ReactElement){
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

const mockCountries = [
    {
        name: "United States of America",
        code: "US",
        dividendPhase: "Dividend Collapse",
        demographicShape: "Shrinking Spire",
        policyScore: 4.8

    },
    {
        name: "Australia",
        code: "AU",
        dividendPhase: "Post-Dividend",
        demographicShape: "Contracting Pillar",
        policyScore: 6.8

    },
    {
        name: "Kenya",
        code: "KE",
        dividendPhase: "Pre-Dividend",
        demographicShape: "Pyramid",
        policyScore: 3.5

    },
]

vi.mock("@/hooks/useCountries", ()=> ({
    useCountries: ()=>({
        data: mockCountries
    })
}))

describe("sortCountries", ()=>{
    it("sorts table by name ascending", ()=>{
        const result = sortCountries(mockCountries, {column: "name", scend: "ascend"});
        expect(result[0].name).toBe("Australia")
    });

    it("sorts table by policy score descending", ()=>{
        const result = sortCountries(mockCountries, {column: "policyScore", scend: "descend"});
        expect(result[0].policyScore).toBe(6.8)
    });
})

describe("Countries table", ()=>{
    it("renders the table with headers and rows", ()=>{
        renderWithClient(<CountryTable/>);
        expect(screen.getByText("Country")).toBeInTheDocument();
        expect(screen.getByText("Shape")).toBeInTheDocument();
        expect(screen.getAllByRole("row").length).toBeGreaterThan(1)
    })
})

describe("CountryTable reducer", ()=>{
    it("sets column to 'name' and scend to 'ascend' on 'country ascend'", ()=>{
        const intialState = { column: "code" as const, scend: "descend" as const};
        const action = {type: "country ascend" as const};

        const result = reducer(intialState, action);

        expect(result).toEqual({column: "name", scend: "ascend"})
    });

    it("sets column to 'policyScore' and scend to 'descend' on 'policy descend'", ()=>{
        const intialState = { column: "code" as const, scend: "ascend" as const};
        const action = {type: "policy descend" as const};

        const result = reducer(intialState, action);

        expect(result).toEqual({column: "policyScore", scend: "descend"})
    });
})