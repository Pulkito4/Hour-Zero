import { useState } from "react";
import { useSubject } from "@/context/SubjectContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SyllabusDocument } from "@/types/documents";
import { addSyllabus } from "@/firebase/firestore";

export const SyllabusForm = ({ onClose }: { onClose: () => void }) => {
  const [syllabusDoc, setSyllabusDoc] = useState<Partial<SyllabusDocument>>({
    name: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { branch, semester, subject } = useSubject();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!syllabusDoc.name || !syllabusDoc.content) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all fields",
      });
      return;
    }

    setIsLoading(true);
    try {
      await addSyllabus(
        branch,
        semester.toString(),
        subject,
        {
          name: syllabusDoc.name,
          content: syllabusDoc.content,
        }
      );

      toast({
        title: "Success",
        description: "Syllabus added successfully!",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add syllabus. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border border-gray-600 rounded bg-gray-900"
          value={syllabusDoc.name}
          onChange={(e) => setSyllabusDoc(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter syllabus title"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          className="w-full p-2 border border-gray-600 rounded bg-gray-900"
          value={syllabusDoc.content}
          onChange={(e) => setSyllabusDoc(prev => ({ ...prev, content: e.target.value }))}
          rows={4}
          placeholder="Enter syllabus content"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {isLoading ? "Adding..." : "Add Syllabus"}
      </Button>
    </form>
  );
};