"use client";

import React from "react";

import { phaseColours } from "@/lib/phaseColours";
import { useCountries } from "@/hooks/useCountries";
import { useState } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import { geoCentroid } from "d3-geo";

import type { Feature } from "geojson";

const geoUrl = "/geo/countries.geojson";

type Props = {
  onCountryClick: (countryCode: string, centroid: [number, number]) => void;
  center?: [number, number];
};

export default function InteractiveWorldMap({ onCountryClick, center }: Props) {
  const [zoom, setZoom] = useState(1);
  
  const { data: countries } = useCountries();
  if (!countries) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 1));

  return (
    <div className="relative w-full max-w-full h-auto">
      <div className="absolute z-10 top-4 left-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white px-3 py-1 rounded shadow"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white px-3 py-1 rounded shadow"
        >
          -
        </button>
      </div>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        className="w-full h-auto"
      >
        <ZoomableGroup
          zoom={zoom}
          onMoveEnd={({ zoom }: { zoom: number }) => setZoom(zoom)}
          center={center ?? [10, -10]}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Feature[] }) =>
              geographies.map((geo: Feature) => {
                const code = geo.properties?.["ISO3166-1-Alpha-2"];
                //console.log("Checking match for geo code:", code, "against countries:", countries.map(c => c.code));

                const match = countries.find((c) => c.code === code);
                //console.log("MATCHING", code, match)
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
                    onClick={() => {
                      const centroid = geoCentroid(geo);
                      console.log("clicked country code:", code);
                      if (centroid && centroid.length === 2) {
                        onCountryClick?.(code, centroid as [number, number]);
                      }
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
