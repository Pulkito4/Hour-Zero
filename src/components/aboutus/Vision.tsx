"use client";
import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GridItemProps {
  area: string;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, title, description }: GridItemProps) => {
  return (
    <>
      <div>
        
        <ul>
          <li
            className={`min-h-[14rem] mx-auto max-w-[55rem] list-none ${area}`}
          >
            <br />
            <div className="relative h-full w-full max-w-4xl mx-auto rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative flex h-full flex-col items-center justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
                <div className="relative flex flex-1 flex-col items-center justify-between gap-3">
                  <div className="space-y-3 text-center w-full">
                    <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
                      {title}
                    </h3>
                    <br />
                    <h2 className="text-white max-w-3xl mx-auto">
                      {description}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

const Vision: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-center ">
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        title="OUR MOTIVATION"
        description="We created HourZero because we know the struggle—digging through endless links, asking seniors for notes, and trying to piece everything together the night before an exam. It’s exhausting. As the first CSE batch, we had no one to guide us, so we built what we wish we had—a single place where students can find everything they need, without the extra hassle. No more last-minute panic, no more scattered resources—just everything in one place, ready to help you ace your exams."
      />
      <GridItem 
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        title="OUR VISION"
        description="Our vision is to build a go-to academic hub where students can effortlessly access well-organized study resources, eliminating the stress of last-minute searches. We envision expanding beyond CSE to cover more courses and branches, ensuring that every student, regardless of their field, has the right tools to succeed—all in one place."
      />
    </div>
  );
};
export default Vision;
