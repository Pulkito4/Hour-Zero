import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase.config";
import { LabDocument } from "@/types/documents";



export const LabTab = ({ documents }: { documents: LabDocument[] }) => {
  const [labDocs, setLabDocs] = useState<LabDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabDocs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lab"));
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as LabDocument));
        setLabDocs(docs);
      } catch (err) {
        setError("Failed to fetch lab documents");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLabDocs();
  }, []);

  const toggleAccordion = (id: string) => setOpenId(openId === id ? null : id);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {labDocs.map((doc) => (
        <div 
          key={doc.id}
          className="bg-gray-950 rounded-lg overflow-hidden
                     border border-purple-500/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        >
          <button
            onClick={() => toggleAccordion(doc.id)}
            className="w-full flex justify-between items-center p-4 
                     text-white hover:bg-gray-900/50 transition-all duration-200"
          >
            <span className="text-lg font-medium">{doc.title}</span>
            <span className="text-xl text-purple-500">
              {openId === doc.id ? "−" : "+"}
            </span>
          </button>
          
          {openId === doc.id && (
            <div className="p-4 border-t border-purple-500/20 bg-gray-900/30">
              {/* <p className="text-gray-300 mb-4">{doc.content}</p> */}
              {/* {doc.pdfUrl && (
                <a
                  href={doc.pdfUrl}
                  className="inline-block bg-purple-600 px-6 py-2 rounded-md
                           text-white hover:bg-purple-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Lab File
                </a>
              )
              } */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LabTab;