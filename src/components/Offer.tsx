"use client";
import { HoverEffect } from "./ui/card-hover-effect";

export function Offer() {
  return (
    <div className="max-w-5xl mx-auto px-8 sm:text-[20px] text-[16px] md:text-[18px]">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  { title: "Notes", description: "" },
  { title: "Assignments", description: "" },
  { title: "Lab Files", description: "" },
  { title: "PYQs", description: "" },
  { title: "TextBooks", description: "" },
  { title: "Videos", description: "" },
];