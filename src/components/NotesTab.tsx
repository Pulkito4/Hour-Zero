import { NotesDocument } from "@/types/documents";

  
  export const NotesTab = ({ documents }: { documents: NotesDocument[] }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <h3 className="text-lg font-medium text-white">{doc.title}</h3>
              {/* <a 
                href={doc.pdfUrl}
                className="mt-2 inline-block bg-purple-600 px-4 py-2 rounded-md text-white hover:bg-purple-700"
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