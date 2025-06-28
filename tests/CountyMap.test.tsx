import React from "react";

//import { vi } from "vitest";

import { render, waitFor } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import DemographicsChart from "@/components/demographicschart/DemographicsChart";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

function renderWithClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  global.ResizeObserver = ResizeObserver;

const transformedData = [
  {
    age_group: "00–04",
    male: -996722,
    offset: 996722,
    female: 863166,
  },
  {
    age_group: "05–09",
    male: -561504,
    offset: 561504,
    female: 533542,
  },
  {
    age_group: "10–14",
    male: -730193,
    offset: 730193,
    female: 718588,
  },
  {
    age_group: "15–19",
    male: -187092,
    offset: 187092,
    female: 177348,
  },
  {
    age_group: "20–24",
    male: -847575,
    offset: 847575,
    female: 769969,
  },
  {
    age_group: "25–29",
    male: -382994,
    offset: 382994,
    female: 400668,
  },
  {
    age_group: "30–34",
    male: -545354,
    offset: 545354,
    female: 582371,
  },
  {
    age_group: "35–39",
    male: -833435,
    offset: 833435,
    female: 877527,
  },
  {
    age_group: "40–44",
    male: -1089806,
    offset: 1089806,
    female: 970559,
  },
  {
    age_group: "45–49",
    male: -1059658,
    offset: 1059658,
    female: 1052384,
  },
  {
    age_group: "50–54",
    male: -848053,
    offset: 848053,
    female: 722416,
  },
  {
    age_group: "55–59",
    male: -1022260,
    offset: 1022260,
    female: 1015999,
  },
  {
    age_group: "60–64",
    male: -1156116,
    offset: 1156116,
    female: 1012422,
  },
  {
    age_group: "65–69",
    male: -1412205,
    offset: 1412205,
    female: 1202990,
  },
  {
    age_group: "70–74",
    male: -440178,
    offset: 440178,
    female: 374968,
  },
  {
    age_group: "75–79",
    male: -1366307,
    offset: 1366307,
    female: 1220781,
  },
  {
    age_group: "80–84",
    male: -561544,
    offset: 561544,
    female: 507330,
  },
  {
    age_group: "85–89",
    male: -733769,
    offset: 733769,
    female: 680351,
  },
  {
    age_group: "90+",
    male: -1109164,
    offset: 1109164,
    female: 1016995,
  },
];

describe("Demographics chart", () => {
  it("renders the demographics chart", () => {
    renderWithClient(<DemographicsChart data={transformedData} />);

    waitFor(()=>{
        const chartSvg = document.querySelector("svg");
      expect(chartSvg).toBeInTheDocument();

    })
  });


});
