"use client"

import {use} from "react"
import { useMemo } from "react";
import React from "react";

import InteractiveWorldMap from "@/components/map/InteractiveWorldMap";
import DemographicsChart from "@/components/demographicschart/DemographicsChart";
import NewsFeed from "@/components/newsfeed/NewsFeed";

import { usePopulationData } from "@/hooks/usePopulationData";
import { useCountryNews } from "@/hooks/useCountryNews";
import { useCountries } from "@/hooks/useCountries";

import { ageBins } from "@/lib/ageBins";


type Params = {
  params: Code;
};

type Code = Promise<{
  code: string;
}>;



export default function CountryPage({ params }: Params) {
  const { code } = use(params);
  const upperCode = code.toUpperCase();

  const { data: rawData } = usePopulationData(upperCode);



  const transformedData = useMemo(() => {
    if (!rawData) return [];

    const grouped: Record<string, { male: number; female: number }> = {};

    for (const entry of rawData) {
      const bin = grouped[entry.age_group] || { male: 0, female: 0 };
      bin[entry.gender as "male" | "female"] = entry.population;
      grouped[entry.age_group] = bin;
    }

    return Object.entries(grouped).map(([age_group, { male, female }]) => {
    
      return {
        age_group,
        male: -Math.abs(male),
        offset: Math.abs(male),
        female: Math.abs(female),
      };
    });
  }, [rawData]).sort((a,b)=> ageBins.indexOf(a.age_group) - ageBins.indexOf(b.age_group));

  //console.log(transformedData)

  const {data: newsArticles} = useCountryNews(upperCode)

  const {data: allCountries} = useCountries()

  if(!allCountries) return null

  const countryData = allCountries.find((c) => c.code === upperCode)

  if(!countryData) return null
  return (
    <>
      <h2 className="text-2xl md:text-3xl pl-2 my-2 border-l-4 font-sans font-bold border-teal-400 text-center mb-4 mx-auto w-fit">
        {countryData.name}
      </h2>
      <div className="flex w-full max-w-[95vw]">
        <div className="flex-1">
          <InteractiveWorldMap code={upperCode} />
        </div>
        <div className="flex-1">
          <DemographicsChart data={transformedData} />
        </div>
        <div className="flex-1 text-center mt-10">
          <div>
            Country Code:{" "}
            <span className="font-bold text-cyan-500">
              {countryData["code"]}
            </span>
          </div>
          <div>
            Phase:{" "}
            <span className="font-bold text-cyan-500">
              {countryData.dividendPhase}
            </span>
          </div>
          <div>
            Demographic Shape:{" "}
            <span className="font-bold text-cyan-500">
              {countryData.demographicShape}
            </span>
          </div>
          <div>
            Policy Score:{" "}
            <span className="font-bold text-cyan-500">
              {countryData.policyScore}
            </span>
          </div>
        </div>
      </div>
      {newsArticles && <NewsFeed articles={newsArticles} />}
    </>
  );
}