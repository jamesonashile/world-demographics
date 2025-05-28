"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/subabaseClient";

export type Country = {
    name: string;
    code: string;
    dividendPhase: string;
    demographicShape: string;
    policyScroe: number;
};

export function useCountries(){
    return useQuery<Country[]>({
        queryKey: ["countries"],
        queryFn: async ()=> {
            const {data, error} = await supabase.from("countries").select("*");

            if(error) throw new Error(error.message);

            return data ?? []
        }
    })
}