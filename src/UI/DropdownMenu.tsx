import React from 'react';
import { Settings } from 'lucide-react';

interface DropdownMenuProps {
  showConfig: boolean;
  setShowConfig: (show: boolean) => void;
  handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: () => void;
  handleClearData: () => void;
  showSaveConfirmation: boolean;
  setShowSaveConfirmation: (show: boolean) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  showConfig,
  setShowConfig,
  handleImport,
  handleExport,
  handleClearData,
  showSaveConfirmation,
  setShowSaveConfirmation,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => setShowConfig(!showConfig)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        title="Settings"
      >
        <Settings className="w-4 h-4" />
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
  );
};
