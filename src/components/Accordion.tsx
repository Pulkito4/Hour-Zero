"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { doc } from "firebase/firestore";

interface AccordionItem {
  id: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-700 rounded-lg bg-gray-900 text-white shadow-md"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex items-center justify-between p-4 text-left font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <span>UNIT - {item.id}</span>
            <ChevronDown
              className={`ml-auto transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              size={24}
            />
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="p-4 border-t border-gray-700">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;