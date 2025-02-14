import { CarousalSlider } from "@/components/Carousel";
import { Dropdown } from "@/components/Dropdown";
import { Whyus } from "@/components/Whyus";
import { Offer } from "@/components/Offer";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Contribution } from "@/components/Contribution";


export default function Home() {
	return (
		<>
			<div className="w-full h-full font-work-sans text-white">
				{/* tagline */}
				<div className="mt-15  font-work-sans text-center font-semibold">
					<span className="text-4xl  text-white">
						HOUR <span className="text-primary-100">ZERO</span>
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
					<div className="relative z-10 w-full max-w-xl mx-auto px-4 ">
						<Dropdown />
					</div>
				</div>

				<div className="px-8 mt-15  mb-15  ">
					<h1 className="text-white ml-4 mb-5 text-3xl font-bold text-center">
						WHAT WE <span className="text-primary-100">OFFER</span>
					</h1>
					<Offer />
				</div>

				{/* <div className="px-8 mt-15  mb-15 ">
					<h1 className="text-white ml-4 mb-9 text-3xl font-bold text-center">
						MEET OUR TOP <span className="text-primary-100">CONTRIBUTORS</span>
					</h1>
					<CarousalSlider />
				</div> */}

				<div className="px-8 mt-15  mb-15 ">
					<h1 className="text-white ml-4 mb-9 text-3xl font-bold text-center">
						WANT TO <span className="text-primary-100">CONTRIBUTE ?</span>
					</h1>
					<Contribution/>
				</div>

				<div className="px-8 mt-15  mb-15 flex flex-col items-center">
					<h1 className="text-white ml-4 mb-5 text-3xl font-bold text-center">
					<span className="text-primary-100">WHY</span> HOUR ZERO ?
					</h1>
					{/* <WhyUs /> */}
					<Whyus/>
				</div>
			</div>
		</>
	);
}
