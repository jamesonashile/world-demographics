import React from "react";

import { vi } from "vitest";

import { render } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import InteractiveWorldMap from "@/components/map/InteractiveWorldMap";

vi.mock("@/lib/countries-data", () => ({
  countries: [
    { name: "India", code: "IN", dividendPhase: "Pre-Dividend" },
    { name: "Japan", code: "JP", dividendPhase: "Post-Dividend" },
  ],
}));

vi.mock(
  "react-simple-maps",
  async (originalModule: () => Promise<Record<string, unknown>>) => {
    const actual = await originalModule();

    return {
      ...actual,
      Geographies: ({
        children,
      }: {
        children: (props: {
          geographies: { properties: Record<string, string> }[];
        }) => React.ReactNode;
      }) =>
        children({
          geographies: [
            {
              properties: {
                "ISO3166-1-Alpha-2": "IN",
                name: "India",
              },
            },
            {
              properties: {
                "ISO3166-1-Alpha-2": "JP",
                name: "Japan",
              },
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
});
