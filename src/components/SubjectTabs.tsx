// "use client";

// import React, { useState } from "react";
// import {
//   BookA,
//   BookOpen,
//   FileCode,
//   FileQuestion,
//   NotebookPen,
//   TvMinimalPlay,
// } from "lucide-react";

// const tabs = [
//   { title: "Notes", icon: <NotebookPen size={20} />, content: "Notes section" },
//   { title: "Assignments", icon: <BookA size={20} />, content: "Assignment section" },
//   { title: "Lab File", icon: <FileCode size={20} />, content: "Lab file section" },
//   { title: "PYQs", icon: <FileQuestion size={20} />, content: "PYQs section" },
//   { title: "Textbooks", icon: <BookOpen size={20} />, content: "Textbook section" },
//   { title: "Videos", icon: <TvMinimalPlay size={20} />, content: "Video section" },
// ];

// const SubjectTab: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div className="w-full max-w-4xl mx-auto items-center justify-center p-4">
//       {/* Tab Navigation */}
//       <div className="flex flex-wrap lg:justify-evenly sm:justify-evenly border-b border-gray-700">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveTab(index)}
//             className={`flex items-center justify-evenly gap-3 px-5 py-2 text-sm sm:text-base sm:gap-2 transition-all ${
//               activeTab === index
//                 ? "text-white border-b-2 border-purple-500"
//                 : "text-gray-400"
//             }`}
//           >
//             {tab.icon}
//             <span className="hidden sm:inline">{tab.title}</span>
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-5 text-white bg-gray-900 rounded-lg shadow-lg mt-4">
//         <p>{tabs[activeTab].content}</p>
//       </div>
//     </div>
//   );
// };

// export default SubjectTab;

"use client";

import React, { useState } from "react";
import {
  BookA,
  BookOpen,
  FileCode,
  FileQuestion,
  NotebookPen,
  TvMinimalPlay,
} from "lucide-react";

interface SubjectTabsProps {
  children?: React.ReactNode;
  defaultValue?: string;
  className?: string;
}

interface TabItem {
  title: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
}

const tabItems: TabItem[] = [
  { title: "Notes", icon: <NotebookPen size={20} /> },
  { title: "Assignments", icon: <BookA size={20} /> },
  { title: "Lab File", icon: <FileCode size={20} /> },
  { title: "PYQs", icon: <FileQuestion size={20} /> },
  { title: "Textbooks", icon: <BookOpen size={20} /> },
  { title: "Videos", icon: <TvMinimalPlay size={20} /> },
];

const SubjectTabs: React.FC<SubjectTabsProps> = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${className}`}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap lg:justify-evenly sm:justify-evenly border-b border-gray-700">
        {tabItems.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center justify-evenly gap-3 px-5 py-2 text-sm sm:text-base sm:gap-2 transition-all ${
              activeTab === index
                ? "text-white border-b-2 border-purple-500"
                : "text-gray-400"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5 text-white mt-4">
        {children}
      </div>
    </div>
  );
};

export default SubjectTabs;