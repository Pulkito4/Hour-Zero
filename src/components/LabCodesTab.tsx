import { LabDocument } from "@/types/documents";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { CodeViewerModal } from "./CodeViewerModal";
import { FileCode } from "lucide-react";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

interface GitHubFile {
  name: string;
  path: string;
  download_url: string;
}

export const LabCodeTab = ({ documents }: { documents: LabDocument[] }) => {
  const [labCodes, setLabCodes] = useState<GitHubFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ content: string; name: string } | null>(null);

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
        path: 'OS lab/Tanishka codes lab file', // folder containing lab codes
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

  useEffect(() => {
    fetchLabCodes();
  }, []);

 

  return (
    <div>
     

     <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {labCodes.map((file) => (
          <div
            key={file.path}
            onClick={() => fetchFileContent(file.download_url, file.name)}
            className="bg-gray-900  text-sm p-5 rounded-lg cursor-pointer hover:bg-gray-800"
          >
            {/* <FileCode className="w-5 h-5 text-purple-500" /> */}
            <span className="  text-white">{file.name}</span>
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
