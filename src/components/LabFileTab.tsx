import { LabDocument } from "@/types/documents";
import { useEffect, useState } from "react";
import { DocumentPreviewer } from "./DocumentPreviewer";
import Accordion from "./Accordion";
import { Octokit } from "@octokit/rest";
import { LabCodeTab } from "./LabCodesTab";

// const octokit = new Octokit({
//   auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
// });

// interface GitHubFile {
//   name: string;
//   path: string;
//   download_url: string;
// }

export const LabFileTab = ({ documents }: { documents: LabDocument[] }) => {
  const [selectedLabFile, setSelectedLabFile] = useState<LabDocument | null>(null);
  // const [labCodes, setLabCodes] = useState<GitHubFile[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const handleOpenModal = (doc: LabDocument) => {
    setSelectedLabFile(doc);
  };

  const handleCloseModal = () => {
    setSelectedLabFile(null);
  };

  // const fetchLabCodes = async () => {
  //   try {
  //     const response = await octokit.repos.getContent({
  //       owner: 'tanishkag237',
  //       repo: 'yc-directory',
  //       path: 'components', // folder containing lab codes
  //     });

  //     if (Array.isArray(response.data)) {
  //       setLabCodes(response.data as GitHubFile[]);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching lab codes:', err);
  //     setError('Failed to load lab codes');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchLabCodes();
  // }, []);

 

  return (
    <div>
      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-gray-950 rounded-lg overflow-hidden outline outline-purple-900
                       hover:shadow-[0_0_15px_rgba(139,92,246,1.0)]
                       transform hover:scale-105 
                       transition-all duration-300 ease-in-out
                       border border-purple-500/20 cursor-pointer"
            onClick={() => handleOpenModal(doc)}
          >
            <div className="p-5 text-center">
              <h3 className="text-lg font-medium text-white">{doc.title}</h3>
              {/* <p className="text-sm text-gray-400">{doc.title}</p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {selectedLabFile && (
        <DocumentPreviewer document={selectedLabFile} onClose={handleCloseModal} />
      )}

      {/* <Accordion items={[labcodes]}/> */}
      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Lab Codes</h2>
        {isLoading && <p className="text-gray-400">Loading lab codes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {labCodes.map((file) => (
            <a
              key={file.path}
              href={file.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-950 rounded-lg p-4 border border-purple-500/20
                       hover:border-purple-500/40 transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <h3 className="text-white font-medium">{file.name}</h3>
            </a>
          ))}
        </div>
      </div> */}

      <LabCodeTab documents={[]}/>
    </div>


  );
};
