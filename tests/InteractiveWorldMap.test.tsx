import React from "react";

import { vi } from "vitest";

import { render, screen, waitFor } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import InteractiveWorldMap from "@/components/map/InteractiveWorldMap";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Feature } from "geojson";

const queryClient = new QueryClient();

function renderWithClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

vi.mock("@/hooks/useCountries", () => ({
  useCountries: () => ({
    data: [
      { name: "India", code: "IN", dividendPhase: "Pre-Dividend" },
      { name: "Japan", code: "JP", dividendPhase: "Post-Dividend" },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock("react-simple-maps", async () => {
  const actual = await vi.importActual("react-simple-maps");

  return {
    ...actual,
    Geographies: ({
      children,
    }: {
      children: (props: { geographies: Feature[] }) => React.ReactNode;
    }) =>
      children({
        geographies: [
          {
            type: "Feature",
            properties: {
              "ISO3166-1-Alpha-2": "JP",
              name: "Japan",
            },
            geometry: { type: "Polygon", coordinates: [] },
          },
          {
            type: "Feature",
            properties: {
              "ISO3166-1-Alpha-2": "IN",
              name: "India",
            },
            geometry: { type: "Polygon", coordinates: [] },
          },
        ],
      }),
  };
});



describe("InteractiveWorldMap", () => {
  it("renders without crashing", () => {
    const mockUpperCode = "IN";

    renderWithClient(<InteractiveWorldMap code={mockUpperCode} />);

    const paths = document.querySelectorAll(".rsm-geography");
    expect(paths.length).toBeGreaterThan(0);
  });

  it("renders WorldMap when no code is null", () => {
    const mockUpperCode = null;

    renderWithClient(<InteractiveWorldMap code={mockUpperCode} />);
    expect(screen.getByTestId("world-map")).toBeInTheDocument();
  });

  it("renders CountryMap when no code is truthy", () => {
    const mockUpperCode = "IN";

    renderWithClient(<InteractiveWorldMap code={mockUpperCode} />);
    expect(screen.getByTestId("country-map")).toBeInTheDocument();
  });

  it("zooms into the specified country on the conditial render", () => {
    const mockUpperCode = "IN";
    //const zoomGroup = screen.getByTestId("zoom-group")

    renderWithClient(<InteractiveWorldMap code={mockUpperCode} />);

    waitFor(() => {
      expect(screen.getByTestId("zoom-value")).toHaveTextContent(
        "4.8000242088177485"
      );
    });
  });
});

  

