import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabaseClient";

export function usePopulationData(code: string | null){

    return useQuery({
        queryKey: ['population-data', code],
        queryFn: async () => {
            if (!code) return [];

            const {data, error} = await supabase
                .from('population_data')
                .select('*')
                .eq('country_code', code)
                .order('age_group', {ascending: true});

                if (error) throw new Error(error.message);
                return data;
        },
        enabled: !!code,
    })
}