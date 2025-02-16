import { FileX } from "lucide-react";

export const NoContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <FileX size={48} className="text-gray-500" />
      <h3 className="text-xl font-semibold text-gray-300">No Content Available</h3>
      <p className="text-gray-400 text-center">
        There's nothing to see here yet. Content will be added soon.
      </p>
    </div>
  );
};