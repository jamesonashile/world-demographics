import React from "react";

import { vi } from "vitest";

import { render, fireEvent } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import InteractiveWorldMap from "@/components/map/InteractiveWorldMap";

import type { Feature } from "geojson";

vi.mock("@/lib/countries-data", () => ({
  countries: [
    { name: "India", code: "IN", dividendPhase: "Pre-Dividend" },
    { name: "Japan", code: "JP", dividendPhase: "Post-Dividend" },
  ],
}));

vi.mock(
  "react-simple-maps",
  async () => {
    const actual = await vi.importActual("react-simple-maps");

    return {
      ...actual,
      Geographies: ({
        children,
      }: {
        children: (props: {
          geographies: Feature[];
        }) => React.ReactNode;
      }) =>
        children({
          geographies: [
            {
              type: "Feature",
              properties: {
                "ISO3166-1-Alpha-2": "JP",
                name: "Japan",
              },
              geometry: {type: "Polygon", coordinates: []},
            },
            {
              type: "Feature",
              properties: {
                "ISO3166-1-Alpha-2": "IN",
                name: "India",
              },
              geometry: {type: "Polygon", coordinates: []},
            },
          ],
        }),
    };
  }
);

describe("InteractiveWorldMap", () => {
  it("renders without crashing", () => {
    render(<InteractiveWorldMap />);
    const paths = document.querySelectorAll(".rsm-geography");
    expect(paths.length).toBeGreaterThan(0);
  });

  it("calls onCountryClick with correct code and centroid", ()=>{
    const mockClick = vi.fn();
    render(<InteractiveWorldMap onCountryClick={mockClick}/>);

    const paths = document.querySelectorAll(".rsm-geography");
    expect(paths.length).toBeGreaterThan(0)

    fireEvent.click(paths[0])
    expect(mockClick).toHaveBeenCalledWith("JP", expect.any(Array))
  })
});
