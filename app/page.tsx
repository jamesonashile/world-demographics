"use client"

import React from "react";

import InteractiveWorldMap from "@/components/map/InteractiveWorldMap";
import CountryPanelModal from "@/components/map/CountryPanelModal";
import { useCountryStore } from "@/store/useCountryStore";
import { useCountries } from "@/hooks/useCountries";
import CountryTable from "@/components/countrytable/CountryTable";



export default function Home() {
  const {activeCountry} = useCountryStore();

  const {data: countries} = useCountries();

  if (!countries) return null;

  

 
  return (
    <main className="p-1">
      
      <InteractiveWorldMap code={null}/>

      <CountryTable/>
      
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
  