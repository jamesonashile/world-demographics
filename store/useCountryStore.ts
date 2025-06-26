import {create} from "zustand";

import type { Country } from "@/types/Country";

type CountryStore ={
    activeCountry: Country | null;
    setActiveCountry: (country: Country | null) => void;
};

export const useCountryStore = create<CountryStore>((set) => ({
    activeCountry: null,
    setActiveCountry: (country) => set({activeCountry: country})
}));