"use client"

import { ContattiData } from "@/components/accordion/accordionData";
import AccordionItem from "@/components/accordion/AccordionItem";
import { useState } from "react";
import Section from "../Section/Section";

export default function ContattiClient() {
    const [expandedId, setExpandedId] = useState(null);
    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };
    return (
        <>
            <main>
                <Section>

                <ul className="flex flex-col gap-3 max-w-lg mx-auto my-25">
                    {ContattiData.map((item) => (
                        <AccordionItem
                        key={item.id}
                        {...item}
                        isExpanded={expandedId === item.id}
                        onToggle={() => toggleExpand(item.id)}
                        />
                    ))}
                </ul>
                    </Section>
            </main>
        </>
    )
}