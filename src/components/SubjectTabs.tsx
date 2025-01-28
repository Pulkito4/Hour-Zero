import { BookA, BookOpen, FileCode, FileQuestion, LibraryBig, NotebookPen, TvMinimalPlay } from "lucide-react";

interface SubjectTabsProps {
  children?: React.ReactNode;
  activeTab: number;
  setActiveTab: (index: number) => void;
  className?: string;
}

interface TabItem {
  title: string;
  icon: React.ReactNode;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({
  children,
  activeTab,
  setActiveTab,
  className,
}) => {
  const tabItems: TabItem[] = [
    { title: "Syllabus", icon: <LibraryBig size={20} /> },
    { title: "Notes", icon: <NotebookPen size={20} /> },
    { title: "Assignments", icon: <BookA size={20} /> },
    { title: "Lab File", icon: <FileCode size={20} /> },
    { title: "PYQs", icon: <FileQuestion size={20} /> },
    { title: "Others", icon: <BookOpen size={20} /> },
    { title: "Videos", icon: <TvMinimalPlay size={20} /> },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${className}`}>
      <div className="flex flex-wrap lg:justify-evenly sm:justify-evenly border-b border-gray-700">
        {tabItems.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center justify-evenly gap-3 px-4 py-2 text-sm sm:text-base sm:gap-2 transition-all ${
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
      <div className="p-5 text-white mt-4">{children}</div>
    </div>
  );
};

export default SubjectTabs;
