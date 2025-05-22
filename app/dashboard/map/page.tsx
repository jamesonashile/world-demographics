"use client"

import InteractiveWorldMap from "../../../components/map/InteractiveWorldMap";

export default function MapPage(){
    return(
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">World Map</h1>
            <InteractiveWorldMap/>
        </main>
    )
}