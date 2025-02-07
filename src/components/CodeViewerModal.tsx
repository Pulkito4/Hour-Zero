import { FC } from 'react';
import { Copy, X } from 'lucide-react';

interface CodeViewerModalProps {
  content: string;
  filename: string;
  onClose: () => void;
}

export const CodeViewerModal: FC<CodeViewerModalProps> = ({ content, filename, onClose }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center sm:w-auto justify-center bg-black bg-opacity-75 sm:text-sm">
      <div className="bg-gray-950 rounded-lg w-[95%] h-[90vh] sm:w-11/12 md:w-4/5 lg:w-3/5 relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">{filename}</h3>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="p-2 hover:bg-gray-800 rounded-lg">
              <Copy className="w-5 h-5 text-purple-500" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
        <div className="p-4 h-[calc(90vh-80px)] overflow-auto">
          <pre className="bg-gray-900 p-4 rounded-lg">
            <code className="text-gray-300 font-mono text-wrap text-sm">{content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};