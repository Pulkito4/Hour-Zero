"use client";

import React, { useState } from "react";

import { AddToSubject } from "@/components/AddToSubject";
import CreateSubject from "@/components/CreateSubject";

const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
    <h2 className="text-2xl font-bold text-white">Welcome to Admin Dashboard</h2>
    <p className="text-gray-400">Select an option to get started</p>
  </div>
);

const Admintabs = [
  { title: "Create Subject", content: <CreateSubject /> },
  { title: "Add to Subject", content: <AddToSubject /> },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto items-center justify-center p-4">
      <h1 className="text-center text-white text-2xl font-work-sans font-semibold">ADMIN DASHBOARD</h1>
      <br />
      
      <div className="flex flex-wrap justify-center sm:justify-evenly border-b border-gray-700">
        {Admintabs.map((Admintabs, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center justify-evenly gap-3 px-5 py-2 text-sm sm:text-base sm:gap-2 transition-all ${
              activeTab === index
                ? "text-white border-b-2 border-purple-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span className=" sm:inline">{Admintabs.title}</span>
          </button>
        ))}
      </div>

      <div className="p-5 text-white bg-gray-900 rounded-lg shadow-lg mt-4">
        {activeTab === null ? <WelcomeMessage /> : Admintabs[activeTab].content}
      </div>
    </div>
  );
};

export default AdminDashboard;