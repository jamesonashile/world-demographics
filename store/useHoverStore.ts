import {create} from "zustand";

type HoverStore = {
    hoverCountryCode: string | null;
    setHoverCountryCode: (code: string | null) => void;
};

export const useHoverStore = create<HoverStore>((set) =>({
    hoverCountryCode: null,
    setHoverCountryCode: (code)=> set({hoverCountryCode: code})
}))