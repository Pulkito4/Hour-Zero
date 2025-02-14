"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../ui/layout-grid";
import { Github as GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";

export function Team() {
  return (
    <div className="h-screen py-20 w-full ">
      <h1 className="text-white text-4xl font-bold text-center mt-2">
        MEET THE <span className="text-primary-100">TEAM</span>
      </h1>
      <hr className="mt-3 w-[70%] mx-auto border-gray-600" />
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Pulkit</p>

      <p className="font-normal text-base text-white">
        Computer Science Engineering
      </p>
      <p className="font-normal text-base text-white">VIPS-TC, GGSIPU</p>
      <p className="font-normal text-sm text-white text-wrap">Web Developer | Tech Enthusiast</p>
      <p className="flex gap-2 font-normal text-base my-4 max-w-lg text-neutral-200">
        <Link
          href="https://github.com/Pulkito4"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-500 transition-colors "
        >
          <GithubIcon size={24} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-500 transition-colors"
          href={"https://www.linkedin.com/in/pulkitgoyal04/"}
        >
          <Linkedin />
        </Link>
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Tanishka</p>
      <p className="font-normal text-base text-white">
        Computer Science Engineering
      </p>
      <p className="font-normal text-base text-white">VIPS-TC, GGSIPU</p>
      
      <p className="flex gap-2 font-normal text-base my-4 max-w-lg text-neutral-200">
        <Link
          href="https://github.com/tanishkag237"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-500 transition-colors"
        >
          <GithubIcon size={24} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-500 transition-colors"
          href={"https://www.linkedin.com/in/tanishkagoel237"}
        >
          <Linkedin />
        </Link>
      </p>
    </div>
  );
};

const cards = [
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/hourzero/image/upload/v1739471335/pulkit_pfp_o3aqow.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
