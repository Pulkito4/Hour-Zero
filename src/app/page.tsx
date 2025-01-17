import Cards from "@/components/Card";
import { CardWithForm } from "@/components/Dropdown";
import Navbar from "@/components/Navbar";
import WhatWeOffer from "@/components/Whatweoffer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* tagline */}
      <div className="mt-6 mb-8 font-work-sans text-center font-semibold">
        <span className="text-4xl  text-white">
          HOUR <span className="text-purple-400">ZERO</span>
        </span>
        <p className="text-gray-400  text-xl !font-normal">
          Because Every Mark Counts
        </p>
      </div>

      {/* dropdown and static board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Dropdown Section */}
        <div className="w-full flex justify-center items-center px-4 sm:px-0">
          <div className="bg-black p-4 rounded-lg w-[90%] sm:w-full max-w-2xl mx-auto">
            <CardWithForm />
          </div>
        </div>

        {/* Static Board */}
        <WhatWeOffer />
      </div>
    </>
  );
}
