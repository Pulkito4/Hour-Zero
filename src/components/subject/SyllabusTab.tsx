import { SyllabusDocument } from "@/types/documents";
import Accordion from "../Accordion";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const SyllabusTab = ({
  documents,
}: {
  documents: SyllabusDocument[];
}) => {

  const accordionItems: AccordionItem[] = documents.map((doc) => ({
    id: doc.id,
    title: doc.name,

    content: (
      <div className="space-y-4 p-4">
        <p className="text-gray-300">{doc.content}</p>
        <div className="text-center"></div>
      </div>
    ),
  }));

  console.log(accordionItems);
  return (
    <div className="p-4">
      <Accordion items={accordionItems} />
    </div>
  );
};

export default SyllabusTab;
