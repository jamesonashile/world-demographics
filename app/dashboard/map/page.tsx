"use client"

import React from "react";

import InteractiveWorldMap from "../../../components/map/InteractiveWorldMap";
import CountryPanelModal from "@/components/CountryPanelModal";
import { useCountryStore } from "@/store/useCountryStore";
import { useCountries } from "@/hooks/useCountries";





export default function MapPage() {
 
  const {activeCountry, setActiveCountry} = useCountryStore();

  const {data: countries} = useCountries();

  if (!countries) return null;

  const handleMouseEnter = (code: string)=>{
    setActiveCountry(null)
    const country = countries.find((c)=>c.code === code);
    if(country){
        setActiveCountry(country);
    } 
  }

  const handleMouseLeave = () =>{
    setActiveCountry(null)
    
  }

 
  return (
    <main className="p-1">
      
      <InteractiveWorldMap
        onCountryEnter={handleMouseEnter}
        onCountryLeave={handleMouseLeave}
      />
      
      {activeCountry && (
        
        <CountryPanelModal
          open={!!activeCountry}
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