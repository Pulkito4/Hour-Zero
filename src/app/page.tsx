import Cards from "@/components/Card";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* tagline */}
      <div className="mt-6 mb-8 font-work-sans text-center font-semibold">
        <span className="text-4xl  text-white">
          HOUR <span className="text-purple-400">ZERO</span>{" "}
        </span>
        <p className="text-gray-400  text-xl !font-normal">
          Because Every Mark Counts
        </p>
      </div>

{/* dropdown and static board */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6 ">
  <div className="bg-gradient-to-r from-black  to-black p-4 rounded-lg text-white">
    Dropdown 1
  </div>
  
  {/* static board */}
  <div className="bg-black p-4 rounded-lg mr-8  shadow-[0_0_20px_rgba(139,92,246,0.5)] 
    transition-shadow duration-300 
    hover:shadow-[0_0_30px_rgba(139,92,246,0.9)]">
    <h2 className="text-white text-xl md:text-2xl mb-4 text-center font-work-sans font-semibold">WHAT WE OFFER</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:text-sm">
      <Cards name={"Notes"} />
      <Cards name={"Assignments"} />
      <Cards name={"Lab Files"} />
      <Cards name={"PYQs"} />
      <Cards name={"TextBooks"} />
      <Cards name={"Videos"} />
    </div>
  </div>
</div>
    </>
  );
}
