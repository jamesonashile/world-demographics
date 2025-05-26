import {create} from "zustand";

type Country = {
    name: string;
    code: string;
    dividendPhase: string;
    demographicShape: string;
    policyScore: number
}

type CountryStore ={
    activeCountry: Country | null;
    setActiveCountry: (country: Country | null) => void;
};

export const useCountryStore = create<CountryStore>((set) => ({
    activeCountry: null,
    setActiveCountry: (country) => set({activeCountry: country})
}));