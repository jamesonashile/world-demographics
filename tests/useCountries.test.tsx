

import React from "react";

import { describe, vi, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



import { useCountries } from "@/hooks/useCountries";

vi.mock("@/lib/supabaseClient",  () => {
  return {
  supabase: {
    from: () => ({
      select:()=>
        Promise.resolve({
        data: [
          {
            name: "Japan",
            code: "JP",
            dividendPhase: "Post-Dividend",
            demographicShape: "Contracting Pillar",
            policyScore: 5.5,
          },
        ],
        error: null,
      }),
    }),
  },
}});

describe("useCountries hook", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  it("fetches countries successfully", async () => {
    const { result } = renderHook(() => useCountries(), { wrapper });

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.[0].code).toBe("JP");
  });
});
