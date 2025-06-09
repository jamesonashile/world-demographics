import React, {ReactElement} from "react";

import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import MapPage from "@/app/dashboard/map/page";


const queryClient = new QueryClient();

function renderWithClient(ui: React.ReactElement){
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

vi.mock("@/hooks/useCountries", () => ({
  useCountries: () => ({
    data: [
      {
        name: "India",
        code: "IN",
        dividendPhase: "Pre-Dividend",
        demographicShape: "Pyramid",
        policyScore: 4.2,
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

vi.mock("react-simple-maps", async () => {
  const actual = await vi.importActual("react-simple-maps");
  return {
    ...actual,
    Geographies: ({
      children,
    }: {
      children: (props: {
        geographies: { 
            type: string; 
            geometry: { type:"Polygon"; coordinates: number[][][] }; 
            properties: Record<string, string>; }[];
      }) => ReactElement;
    }) =>
      children({
        geographies: [
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
    Geography: ({
      geography,
      onMouseEnter,
      onMouseLeave
    }: {
      geography: {properties: Record<string, string>};
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    }) => (
      <path
        data-testid={`country-${geography.properties["ISO3166-1-Alpha-2"]}`}
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
      />
    ),
  };
});

describe("MapPage integration", () => {
  it("makes sure mouse entering country triggers modal with correct data", async () => {
    
    renderWithClient(<MapPage/>)

    const india = await screen.findByTestId("country-IN");

    fireEvent.mouseEnter(india);

    await waitFor(() => {
      expect(
        screen.getByText(
          (content) => content.includes("India") && content.includes("(IN)")
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Phase: Pre-Dividend/i)).toBeInTheDocument();
      expect(screen.getByText(/Shape: Pyramid/i)).toBeInTheDocument();
      expect(screen.getByText(/Policy Score: 4.2/i)).toBeInTheDocument();
    });


  });
});
