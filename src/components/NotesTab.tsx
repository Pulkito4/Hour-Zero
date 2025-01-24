import { NotesDocument } from "@/types/documents";

export const NotesTab = ({ documents }: { documents: NotesDocument[] }) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
      {documents.map((doc) => (
        <div 
          key={doc.id} 
          className="bg-gray-950 rounded-lg overflow-hidden outline outline-purple-900
                     hover:shadow-[0_0_15px_rgba(139,92,246,1.0)]
                     transform hover:scale-105 
                     transition-all duration-300 ease-in-out
                     border border-purple-500/20"
        >
          <div className="p-5 text-center">
            <h3 className="text-lg font-medium text-white mb-3">{doc.title}</h3>
            {/* <a 
              href={doc.pdfUrl}
              className="mt-4 inline-block bg-purple-600 px-6 py-2 rounded-md 
                         text-white hover:bg-purple-700 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a> */}
          </div>
        </div>
      ))}
    </div>
  )
}