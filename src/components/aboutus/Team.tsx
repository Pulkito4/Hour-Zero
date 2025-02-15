"use client";
import React from "react";
import { LayoutGrid } from "../ui/layout-grid";
import { Github as GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";

export function Team() {
  return (
    <div className="h-screen py-20 w-full">
      <h1 className="text-white text-4xl font-bold text-center mt-2">
        MEET THE <span className="text-primary-100">TEAM</span>
      </h1>
      <hr className="mt-3 w-[70%] mx-auto border-gray-600" />
      <LayoutGrid cards={cards} />
    </div>
  );
}

interface TeamMember {
  name: string;
  branch: string;
  college: string;
  description?: string;
  github: string;
  linkedin: string;
  image: string;
}

const memberList: TeamMember[] = [
  {
    name: "Pulkit",
    branch: "Computer Science Engineering",
    college: "VIPS-TC, GGSIPU",
    description: "Web Developer | Tech Enthusiast",
    github: "https://github.com/Pulkito4",
    linkedin: "https://www.linkedin.com/in/pulkitgoyal04/",
    image: "https://res.cloudinary.com/hourzero/image/upload/v1739471335/pulkit_pfp_o3aqow.jpg",
  },
  {
    name: "Tanishka",
    branch: "Computer Science Engineering",
    college: "VIPS-TC, GGSIPU",
    description: "Web Developer",
    github: "https://github.com/tanishkag237",
    linkedin: "https://www.linkedin.com/in/tanishkagoel237",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop",
  }
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, branch, college, description, github, linkedin }) => {
  return (
    <div className="text-white ">
      <p className="font-bold md:text-4xl text-xl">{name}</p>
      <p className="font-normal text-base">{branch}</p>
      <p className="font-normal text-base">{college}</p>
      {description && <p className="font-normal text-sm">{description}</p>}

      {/* Socials */}
      <div className="flex  gap-3 mt-4">
        <Link href={github} target="_blank" className="hover:text-purple-500 transition-colors">
          <GithubIcon size={24} />
        </Link>
        <Link href={linkedin} target="_blank" className="hover:text-purple-500 transition-colors">
          <Linkedin />
        </Link>
      </div>
    </div>
  );
};

const cards = memberList.map((member, index) => ({
  id: index + 1,
  content: <TeamMemberCard {...member} />,
  className: "col-span-1",
  thumbnail: member.image,
}));

export default Team;
