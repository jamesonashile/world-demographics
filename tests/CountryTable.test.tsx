import React from "react";
import { it, describe, expect, vi } from "vitest";
import { sortCountries } from "@/lib/sortCountries";
import CountryTable from "@/components/countrytable/CountryTable";
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