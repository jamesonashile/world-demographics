"use client";

import React from "react";
import { useHoverStore } from "@/store/useHoverStore";

type Props = {
  country: string;
  code: string;
  phase: string;
  shape: string;
  score: number;
};

export default function CountryTableRow({ country, code, phase, shape, score }: Props) {

const setHoverCountryCode = useHoverStore((state)=> state.setHoverCountryCode);


  return (
      <tr className="hover:bg-blue-200 transition-colors" onMouseEnter={()=>setHoverCountryCode(code)} onMouseLeave={()=>setHoverCountryCode(null)}>
        <td className="px-3 py-2 whitespace-nowrap text-gray-500">{country}</td>
        <td className="px-3 py-2 whitespace-nowrap text-gray-500">{code}</td>
        <td className="px-3 py-2 whitespace-nowrap text-gray-500">{phase}</td>
        <td className="px-3 py-2 whitespace-nowrap text-gray-500">{shape}</td>
        <td className="px-3 py-2 whitespace-nowrap text-gray-500">{score}</td>
      </tr>
  );
}
