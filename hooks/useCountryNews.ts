import {useQuery} from "@tanstack/react-query"
import { countryCodeName } from "@/lib/countryCodeName";
export function useCountryNews(code: string | null){
    const countryName = code ? countryCodeName[code] || code : "";
    const topicQuery = `"ageing population" OR "birth rate" OR "death rate" OR "population growth" OR "population decline" OR "fertility rate" OR "replacement rate"`;
    const fullQuery = `${topicQuery} ${countryName}`

    return useQuery({
        queryKey: ["country-news", code],
        queryFn: async () => {
            if(!code) return [];

            const res = await fetch(
                `https://gnews.io/api/v4/search?q=${encodeURIComponent(fullQuery)}&lang=en&max=10&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`
            );

            const data = await res.json();

            const articles = data.articles || [];

            articles.sort((a: {publishedAt: string}, b: {publishedAt: string}) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

            return articles
        },

        enabled: !!code
    })
}