import React from 'react';
import { Copy, Download, Settings } from 'lucide-react';

interface ToolbarProps {
  showConfig: boolean;
  setShowConfig: (show: boolean) => void;
  handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: () => void;
  handleClearData: () => void;
  showSaveConfirmation: boolean;
  setShowSaveConfirmation: (show: boolean) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  showConfig,
  setShowConfig,
  handleImport,
  handleExport,
  handleClearData,
  showSaveConfirmation,
  setShowSaveConfirmation,
}) => {
  const handleCopy = () => {
    console.log('Copy functionality - to be implemented');
  };

  const handlePaste = () => {
    console.log('Paste functionality - to be implemented');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        title="Copy"
      >
        <Copy className="w-5 h-5" />
      </button>
      
      <button
        onClick={handlePaste}
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        title="Paste"
      >
        <Download className="w-5 h-5" />
      </button>

      <div className="relative">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        {showConfig && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
            <label
              htmlFor="importFile"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Import Bookmarks
            </label>
            <input
              type="file"
              id="importFile"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={handleExport}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export Bookmarks
            </button>
            <button
              onClick={handleClearData}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Clear All Data
            </button>
            <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <input
                type="checkbox"
                checked={showSaveConfirmation}
                onChange={(e) => {
                  setShowSaveConfirmation(e.target.checked);
                  localStorage.setItem('app-save-confirmation', JSON.stringify(e.target.checked));
                }}
                className="mr-2"
              />
              Show save confirmation
            </label>
          </div>
        )}
      </div>
    </div>
  );
};