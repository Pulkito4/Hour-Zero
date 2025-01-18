import Cards from "@/components/Card";
import { CarousalSlider } from "@/components/Carousel";
import { Dropdown } from "@/components/Dropdown";
import Navbar from "@/components/Navbar";
import { Offer } from "@/components/Offer";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    <>
      <div className="w-full h-full font-work-sans">
        {/* tagline */}
        <div className="mt-15  font-work-sans text-center font-semibold">
          <span className="text-4xl  text-white">
            HOUR <span className="text-purple-400">ZERO</span>
          </span>
          <p className="text-gray-400  text-xl !font-normal">
            Because Every Mark Counts
          </p>
        </div>

  <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
    {/* WavyBackground Container */}
    <div className="absolute inset-0 w-full h-[500px]">
      <WavyBackground />
    </div>
    
    {/* Dropdown Container */}
    <div className="relative z-50 w-full max-w-xl mx-auto px-4">
      <Dropdown />
    </div>
  </div>



        

        <div className="px-8 mt-15  mb-15  ">
          <h1 className="text-center text-2xl text-white font-bold">WHAT WE OFFER</h1>
          <Offer/>
        </div>

        <div className="px-8 mt-15  mb-15 ">
          <h1 className="text-white ml-4 mb-3 text-2xl">
            MEET OUR TOP CONTRIBUTORS{" "}
          </h1>
          <CarousalSlider />
        </div>
      </div>
    </>
  );
}
