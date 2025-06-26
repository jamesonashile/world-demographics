"use client"

import {use} from "react"
import { useMemo } from "react";

import InteractiveWorldMap from "@/components/map/InteractiveWorldMap";
import DemographicsChart from "@/components/demographicschart/DemographicsChart";
import NewsFeed from "@/components/newsfeed/NewsFeed";

import { usePopulationData } from "@/hooks/usePopulationData";
import { useCountryNews } from "@/store/useCountryNews";
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

  const {data: newsArticles} = useCountryNews(upperCode)

  return (
    <>
    <div className="flex w-full max-w-[90vw]">
        <div className="flex-1">

      <InteractiveWorldMap code={upperCode} />
        </div>
        <div className="flex-1">
        <DemographicsChart data={transformedData} />

        </div>
    </div>
    {newsArticles && <NewsFeed articles={newsArticles} />}
    
    </>
  );
}