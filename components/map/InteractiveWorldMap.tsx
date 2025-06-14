"use client";

import React from "react";

import { phaseColours } from "@/lib/phaseColours";
import { useCountries } from "@/hooks/useCountries";
import { useState } from "react";
import { useHoverStore } from "@/store/useHoverStore";

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
  onCountryEnter: (countryCode: string, centroid: [number, number]) => void;
  onCountryLeave: () => void;
};

type CoordinateZoom = {
  coordinates: [number, number];
    zoom: number;
}

export default function InteractiveWorldMap({
  onCountryEnter,
  onCountryLeave,
}: Props) {
  const [zoom, setZoom] = useState<number>(1.2);
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  const { data: countries } = useCountries();

const hoverCountryCode = useHoverStore((state)=> state.hoverCountryCode);

  if (!countries) return null;

  function handleZoomIn(){return setZoom((z) => Math.min(z * 1.5, 8))};
  function handleZoomOut(){return setZoom((z) => Math.max(z / 1.5, 1.2))};

  function clamp(value: number, min: number, max: number){return Math.max(min, Math.min(max, value))};

  function handleMoveEnd({
    coordinates,
    zoom,
  }: CoordinateZoom){
    const [lng, lat] = coordinates;

    const maxLat = zoom * 20;
    const maxLng = zoom * 45;

    const clampedLat = clamp(lat, -maxLat, maxLat);
    const clampedLng = clamp(lng, -maxLng, maxLng);

    setCenter([clampedLng, clampedLat]);
    setZoom(zoom);
  };

  return (
    <div className="relative w-full max-w-full h-auto flex justify-center">
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
        projectionConfig={{ scale: 180 }}
        className="w-full h-[80vh]"
      >
        <ZoomableGroup zoom={zoom} onMoveEnd={handleMoveEnd} center={center}>
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
                        fill: hoverCountryCode === geo.properties["ISO3166-1-Alpha-2"] ? "#9ca3af" : fill,
                        outline: "none",
                      },
                      hover: {
                        fill: "#9ca3af",
                        outline: "none",
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
