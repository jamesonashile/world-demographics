"use client";

import React from "react";


import { useCountries } from "@/hooks/useCountries";
import { useState, useEffect, useRef } from "react";
import WorldMap from "@/components/map/WorldMap";
import { useCountryStore } from "@/store/useCountryStore";

import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import CountryMap from "./CountryMap";


type CoordinateZoom = {
  coordinates: [number, number];
  zoom: number;
};

type Code = {
  code: string | null;
};

export default function InteractiveWorldMap({ code }: Code) {
  const [controlledZoom, setControlledZoom] = useState<number>(1.4);
  const [controlledCenter, setControlledCenter] = useState<[number, number]>([0, 0]);
  const { setActiveCountry } = useCountryStore();

  const mapRef = useRef<HTMLDivElement>(null);

  const targetView = useRef<{ controlledZoom: number; controlledCenter: [number, number] } | null>(
    null
  );

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        const { offsetWidth, offsetHeight } = mapRef.current;
        console.log(offsetWidth);
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const { data: countries } = useCountries();

  if (!countries) return null;

  function handleMouseEnter(modalCode: string) {
    setActiveCountry(null);
    const country = countries!.find((c) => c.code === modalCode);
    if (country) {
      setActiveCountry(country);
    }
  }

  function handleMouseLeave() {
    setActiveCountry(null);
  }

  

  function countryZoom(controlledZoom: number){
    console.log(controlledZoom)
     return setControlledZoom(()=>controlledZoom)
  }

  function handleZoomIn(){
    console.log(controlledZoom)
    return setControlledZoom((z) => Math.min(z * 1.5, 50));
  }
  function handleZoomOut() {
    console.log(controlledZoom)
    return setControlledZoom((z) => Math.max(z / 1.5, 1.2));
  }



  function handleMoveEnd({ coordinates, zoom }: CoordinateZoom) {
   
    const [lng, lat] = coordinates;

   setControlledCenter([lng, lat]);
   setControlledZoom(zoom);
 
  }

  

  return (
    <div
      ref={mapRef}
      className={`relative max-w-${!code ? 'full' : '[34vw]'} ${!code ? 'h-[65vh]' : 'h-[35vh]'} flex justify-start`}
    >
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
        className={`${!code? 'w-full' : 'w-[50vw]'} h-full`}
      >
        <ZoomableGroup
          zoom={controlledZoom}
          onMoveEnd={handleMoveEnd}
          center={controlledCenter}
          maxZoom={!code ? 8 : 50}
        >
          {code === null ? (
            <WorldMap
              onCountryEnter={handleMouseEnter}
              onCountryLeave={handleMouseLeave}
            />
          ) : (
            <CountryMap
              countryCode={code}
              dimensions={dimensions}
              setControlledCenter={setControlledCenter}
              setControlledZoom={setControlledZoom}
              targetView={targetView}
              countryZoom={countryZoom}
            />
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}