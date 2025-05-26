"use client"

import { useState } from "react";

import InteractiveWorldMap from "../../../components/map/InteractiveWorldMap";


  
export default function MapPage(){

    const [center, setCenter] = useState<[number, number] | undefined>(undefined)
    
    return(
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">World Map</h1>
            <InteractiveWorldMap
            onCountryClick={(_, centroid) => setCenter(centroid)}
            center={center}
            />
        </main>
    )
}