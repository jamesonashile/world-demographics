"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
//import {useCountryStore} from "@/store/useCountryStore";

type Props = {
    open: boolean;
    onOpenChange: (open:boolean) => void;
    name: string;
    code: string;
    phase: string;
    shape: string;
    policyScore: number;
};

export default function CountryPanelModal({
    open,
    onOpenChange,
    name,
    code,
    phase,
    shape,
    policyScore,
}: Props){
    return(
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content className="fixed bottom-4 right-4 w-80 bg-white p-4 rounded shadow-lg z-50 border border-gray-200">
                <Dialog.Title className="text-lg font-bold mb-2">
                    {name}({code})
                </Dialog.Title>
                <div className="space-y-1 text-sm text-gray-700">
                    <div>Phase: {phase}</div>
                    <div>Shape: {shape}</div>
                    <div>Policy Score: {policyScore}</div>
                </div>
                <button onClick={()=> onOpenChange(false)}>
                    Close
                </button>
            </Dialog.Content>
        </Dialog.Root>
    )
}