"use client";

import React from "react";

import { phaseColours } from "@/lib/phaseColours";
import { countries } from "@/lib/countries-data";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import type {Feature} from "geojson";

const geoUrl = "/geo/countries.geojson";


export default function InteractiveWorldMap() {

    
  return (
    <div className="w-full max-w-full h-auto border-2 border-red-500">
      <div className="absolut z-10 top-2 left-2 flex gap-2">
        <button className="bg-white px-3 py-1 rounded shadow">+</button>
        <button className="bg-white px-3 py-1 rounded shadow">-</button>
      </div>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        className="w-full h-auto"
      >
        <ZoomableGroup zoom={1} center={[0, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Feature[] }) =>
              geographies.map((geo: Feature) => {
                const code = geo.properties?.["ISO3166-1-Alpha-2"];
                const match = countries.find((c) => c.code === code);
                const phase = match?.dividendPhase;
                const fill = phase
                  ? phaseColours[phase] ?? "#e5e7eb"
                  : "#e5e7eb";

                if (!geo.properties) return null;

                return (
                  <Geography
                    key={
                      geo.properties["ISO3166-1-Alpha-2"] ||
                      geo.properties?.name
                    }
                    geography={geo}
                    style={{
                      default: {
                        fill,
                        outline: "none",
                      },
                      hover: {
                        fill: "#9ca3af",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
