"use client"

import {Geographies, Geography} from "react-simple-maps"

import { geoCentroid } from "d3-geo";

import type { Feature } from "geojson";

const geoUrl = "/geo/countries.geojson";

import { useCountries } from "@/hooks/useCountries";

import { useHoverStore } from "@/store/useHoverStore";

import { phaseColours } from "@/lib/phaseColours";

import { useRouter } from "next/navigation";

import React from "react";

type Props = {
  onCountryEnter: (countryCode: string, centroid: [number, number]) => void;
  onCountryLeave: () => void;
};

export default function WorldMap({ onCountryEnter, onCountryLeave }: Props) {
  const router = useRouter();

  const { data: countries } = useCountries();

  const hoverCountryCode = useHoverStore((state) => state.hoverCountryCode);

  if (!countries) return null;

  return (
   <>
   
    <Geographies geography={geoUrl}>
      {({ geographies }: { geographies: Feature[] }) =>
        geographies.map((geo: Feature) => {
          const code = geo.properties?.["ISO3166-1-Alpha-2"];

          const match = countries.find((c) => c.code === code);

          const phase = match?.dividendPhase;
          const fill = phase ? phaseColours[phase] ?? "#e5e7eb" : "#e5e7eb";

          if (!geo.properties) return null;

          return (
            
            <Geography
              key={geo.properties["ISO3166-1-Alpha-2"] || geo.properties?.name}
              geography={geo}
              
              onClick={() => {
                const routeCode = geo.properties!["ISO3166-1-Alpha-2"];
                if (routeCode) {
                  router.push(`/countries/${code.toLowerCase()}`);
                }
              }}
              style={{
                default: {
                  fill:
                    hoverCountryCode === geo.properties["ISO3166-1-Alpha-2"]
                      ? "#9ca3af"
                      : fill,
                  outline: "none",
                  curosor: "pointer",
                },
                hover: {
                  fill: "#9ca3af",
                  outline: "none",
                  curosor: "pointer",
                },
              }}
              onMouseEnter={() => {
                const centroid = geoCentroid(geo);

                if (centroid && centroid.length === 2) {
                  onCountryEnter?.(code, centroid as [number, number]);
                }
              }}
              onMouseLeave={() => {
                onCountryLeave();
              }}
            />
          );
        })
      }
    </Geographies>
    <div data-testid="world-map"></div>
   </>

   
  );
}