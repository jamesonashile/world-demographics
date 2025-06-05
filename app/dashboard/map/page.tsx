"use client"

import React from "react";

import { useState } from "react";

import InteractiveWorldMap from "../../../components/map/InteractiveWorldMap";
import CountryPanelModal from "@/components/CountryPanelModal";
import { useCountryStore } from "@/store/useCountryStore";
import { useCountries } from "@/hooks/useCountries";





export default function MapPage() {
  const [center, setCenter] = useState<[number, number] | undefined>(undefined);
  const {activeCountry, setActiveCountry} = useCountryStore();

  const {data: countries} = useCountries();

  if (!countries) return null;

  const handleCountryClick = (code: string, centroid: [number, number])=>{
    
    const country = countries.find((c)=>c.code === code);
    if(country){
        setActiveCountry(country);
        setCenter(centroid)
    }
  }

 
  return (
    <main className="p-1">
      
      <InteractiveWorldMap
        onCountryClick={handleCountryClick}
        center={center}
      />
      
      {activeCountry && (
        
        <CountryPanelModal
          open={!!activeCountry}
          onOpenChange={(open) => {
            if (!open) setActiveCountry(null);
          }}
          name={activeCountry.name}
          code={activeCountry.code}
          phase={activeCountry.dividendPhase}
          shape={activeCountry.demographicShape}
          policyScore={activeCountry.policyScore}
        /> 
      )}
    </main>
  );
}