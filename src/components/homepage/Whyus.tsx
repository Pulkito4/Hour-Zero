"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Whyus() {
	return (
		<GridItem
			area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
			title="Because we get it. Studying last-minute isn't a choice; it's a lifestyle. And we’ve built HourZero exactly for that—to save you from academic disasters and questionable all-nighters."
			description="We've got exactly what you need to pull it off: laser-focused resources, carefully curated playlists for those legendary all-nighters, and everything designed to boost your GPA without the fluff. Notes, PYQs, assignments—whatever it takes to survive the semester, we’ve got your back."
		/>
	);
}

interface GridItemProps {
	area: string;
	title: string;
	description: React.ReactNode;
}

const GridItem = ({ area, title, description }: GridItemProps) => {
	return (
		<li className={`min-h-[14rem] list-none ${area}`}>
			<div className="relative h-full w-80% rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
				<GlowingEffect
					spread={40}
					glow={true}
					disabled={false}
					proximity={64}
					inactiveZone={0.01}
				/>
				<div className="relative flex  h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
					<div className="relative flex flex-1 flex-col justify-between gap-3">
						<div className="space-y-3">
							<h3 className="pt-0.5 text-xl/[1.375rem]  text-center font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
								{title}
							</h3>
							<br />
							<p className="text-white text-center">
								We have the exact resources - notes, playlists
								and survival kits that will actually get you a
								good GPA—without you having to pull a miracle.
								<br /> <br />
								So go ahead, procrastinate a little longer (or
								maybe not). We’ve got your back. 😎
							</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};
