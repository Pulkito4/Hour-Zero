"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const subjects = [
  { id: 1, name: "Computer Networks" },
  { id: 2, name: "Operating Systems" },
  { id: 3, name: "Database Management" },
  { id: 4, name: "Theory of Computation" },
  { id: 5, name: "Software Engineering" },
];

const LeftSidebar = () => {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  return (
    <>
   
    <nav className="w-72 min-h-screen bg-black p-6">
      <div className="flex flex-col gap-8">
      <div className="text-white text-center font-bold">SELECT A SUBJECT </div>
      <hr></hr>
        <ul className="flex flex-col gap-6">
       
          {subjects.map((subject) => (
            <li
              key={subject.id}
              className={`group rounded-lg transition-all duration-300 ${
                selectedSubject === subject.id
                  ? "bg-purple-600 shadow-lg shadow-purple-600/50"
                  : "hover:bg-purple-800/40"
              }`}
            >
              <Button
                variant="ghost"
                className="w-full flex items-center p-6 text-white group-hover:bg-purple-600/50"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <span
                  className={`text-lg font-medium transition-colors ${
                    selectedSubject === subject.id
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white "
                  }`}
                >
                  {subject.name}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
    </>
  );
};

export default LeftSidebar;
