import { LabDocument } from "@/types/documents";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { CodeViewerModal } from "./CodeViewerModal";
import { FileCode } from "lucide-react";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

interface GitHubFile {
  type: string;
  name: string;
  path: string;
  download_url: string;
}

export const LabCodeTab = ({ documents }: { documents: LabDocument[] }) => {

  const [rootFolder, setRootFolder] = useState('WT lab');
  const [currentPath, setCurrentPath] = useState(rootFolder);
  const [pathHistory, setPathHistory] = useState<string[]>([rootFolder]);
  const [labCodes, setLabCodes] = useState<GitHubFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);

  const labFolders = ['WT lab', 'OS lab', 'JAVA lab'];

  const handleLabChange = (selectedLab: string) => {
    setRootFolder(selectedLab);
    setCurrentPath(selectedLab);
    setPathHistory([selectedLab]);
    setIsLoading(true);
  };


  const handlePathClick = (index: number) => {
    const newPath = pathHistory[index];
    setCurrentPath(newPath);
    setPathHistory(prev => prev.slice(0, index + 1));
  };

  const handleFolderClick = (newPath: string) => {
    setCurrentPath(newPath);
    setPathHistory(prev => [...prev, newPath]);
    setIsLoading(true);
  };

  const fetchFileContent = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      setSelectedFile({ content, name: filename });
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };


  const fetchLabCodes = async () => {
    try {
      const response = await octokit.repos.getContent({
        owner: 'tanishkag237',
        repo: 'Btech-3rd-Yr-coding-stuff',
        path: currentPath,
      });

      if (Array.isArray(response.data)) {
        setLabCodes(response.data as GitHubFile[]);
      }
    } catch (err) {
      console.error('Error fetching lab codes:', err);
      setError('Failed to load lab codes');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleFolderClick = (newPath: string) => {
  //   setCurrentPath(newPath);
  //   setIsLoading(true);
  //   fetchLabCodes();
  // };

  useEffect(() => {
    fetchLabCodes();
  }, [currentPath]);

 

  return (
    <div>

      
     
 {/* Path breadcrumb */}

     <div className="p-4">

     <div className="mb-4">
        <select
          value={rootFolder}
          onChange={(e) => handleLabChange(e.target.value)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
        >
          {labFolders.map((lab) => (
            <option key={lab} value={lab}>
              {lab}
            </option>
          ))}
        </select>
      </div>

     <div className="flex items-center gap-2 mb-4 text-sm">
        {pathHistory.map((path, index) => (
          <div key={path} className="flex items-center">
            <button
              onClick={() => handlePathClick(index)}
              className={`hover:text-purple-500 transition-colors
                ${currentPath === path ? 'text-purple-500' : 'text-gray-400'}`}
            >
              {path.split('/').pop()}
            </button>
            {index < pathHistory.length - 1 && (
              <span className="mx-2 text-gray-600">/</span>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {labCodes.map((file) => (
          <div
            key={file.path}
            onClick={() => 
              file.type === 'dir' 
                ? handleFolderClick(file.path)
                : fetchFileContent(file.download_url, file.name)
            }
            className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 
                     transition-all duration-200 hover:shadow-lg"
          >
            {/* <FileCode className="w-5 h-5 text-purple-500" /> */}
            <span className="ml-2 text-white capitalize">{file.name}</span>
          </div>
        ))}
      </div>

      {selectedFile && (
        <CodeViewerModal
          content={selectedFile.content}
          filename={selectedFile.name}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
    </div>


  );
};
