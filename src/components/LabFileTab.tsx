import { LabDocument } from "@/types/documents";

export const LabFileTab = ({ documents }: { documents: LabDocument[] }) => {
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
          </div>
        </div>
      ))}
    </div>
  )
}