"use client";

import React from "react";

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
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        className="w-full h-auto"
      >
        <ZoomableGroup zoom={1} center={[0, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }: {geographies: Feature[]}) =>
              geographies.map((geo: Feature) => {
                if(!geo.properties) return null

                  return (
                  <Geography
                    key={geo.properties["IS03166-1-Alpha-2"] || geo.properties?.name}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#e5e7eb",
                        outline: "none",
                      },
                      hover: {
                        fill: "#9ca3af",
                        outline: "none",
                      },
                    }}
                  />
                )
              }
                
            )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
