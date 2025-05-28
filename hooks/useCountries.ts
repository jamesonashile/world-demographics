"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/subabaseClient";

import type { Country } from "@/types/Country";

export function useCountries(){
    
    return useQuery<Country[]>({
        queryKey: ["countries"],
        queryFn: async ()=> {
            const {data, error} = await supabase.from("countries").select("*");
            console.log("Supabase result:", { data, error });
            if(error) throw new Error(error.message);

            return data ?? []
        }
    })
}