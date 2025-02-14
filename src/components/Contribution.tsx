"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Contribution() {
  return (
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"

        title="Education is all about collaboration!"
        description="If you’ve got useful notes, assignments, or study materials from any branch, why keep them to yourself? Share them here and help create a one-stop hub for every student in need. "
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
              <br/>
              <div className="text-center">
              <h4 className="mb-3 text-lg">{description}</h4>
              <p className="text-gray-500 text-md">P.S. Good karma has a way of coming back when you need it the most! 😊</p>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
