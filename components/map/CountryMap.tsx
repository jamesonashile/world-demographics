"use client";

import React from "react";

import { Geographies, Geography } from "react-simple-maps";

import type { Feature } from "geojson";

import { geoPath } from "d3-geo";

import { useCountries } from "@/hooks/useCountries";

import { phaseColours } from "@/lib/phaseColours";
import { useEffect } from "react";

const geoUrl = "/geo/countries.geojson";

type CountryMapProps = {
  countryCode: string;
  dimensions: { width: number; height: number };
  setControlledCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
  setControlledZoom: React.Dispatch<React.SetStateAction<number>>;
  targetView: React.RefObject<{controlledZoom: number; controlledCenter: [number, number]} | null>;
  countryZoom: (controlledZoom: number)=> void;
};

export default function CountryMap({
  countryCode,
  dimensions,
  countryZoom,
  setControlledCenter,
  targetView,
}: CountryMapProps) {
  const { data: countries } = useCountries();


  
  useEffect(()=>{
    if(targetView === null) return

    const timer = setTimeout(()=>{
      if(targetView.current){
         countryZoom(targetView.current.controlledZoom)
         setControlledCenter(targetView.current.controlledCenter);
      }

    },1000);
    return () => clearTimeout(timer)
  }, [])

  if (!countries) return null;

  return (
    <>
    
    <Geographies geography={geoUrl}>
      {({ geographies }: { geographies: Feature[] }) => {
        const geo = geographies.find(
          (c) => c.properties?.["ISO3166-1-Alpha-2"] === countryCode
        );
        
        if (!geo || !geo.properties) return null;

        const pathGenerator = geoPath();

        const bounds = pathGenerator.bounds(geo);

        

        const [[x0, y0], [x1, y1]] = bounds;
        const featureWidth = x1 - x0;
        const featureHeight = y1 - y0;

        

        const mapWidth = dimensions.width;
        const mapHeight = dimensions.height;

  

        const scaleX = mapWidth / featureWidth;
        const scaleY = mapHeight / featureHeight;

        const countryZoom = 0.5 * Math.min(scaleX, scaleY);

        const centerX = (x0 + x1) / 2;
        const centerY = (y0 + y1) / 2;

        targetView.current = {
          controlledZoom: countryZoom,
          controlledCenter: [centerX, centerY]
        };

       

        const code = geo.properties?.["ISO3166-1-Alpha-2"];

        const match = countries.find((c) => c.code === code);

        const phase = match?.dividendPhase;
        const fill = phase ? phaseColours[phase] ?? "#e5e7eb" : "#e5e7eb";

        if (!geo.properties) return null;

        return (
          <Geography
            key={geo.properties["ISO3166-1-Alpha-2"] || geo.properties?.name}
            geography={geo}
            
            style={{
              default: {
                fill,
                outline: "none",
              },
              hover: {
                fill,
                outline:"none"
              },
            }}
          />
        );
      }}
    </Geographies>
    <div data-testid="country-map"></div>
    </>

    
  );
}
