import { it, describe, expect } from "vitest";
import { sortCountries } from "@/lib/sortCountries";

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