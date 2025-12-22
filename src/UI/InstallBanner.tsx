import React from 'react';

interface InstallBannerProps {
  isInstalled: boolean;
  bookmarkletRef: React.RefObject<HTMLAnchorElement>;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({ isInstalled, bookmarkletRef }) => {
  return (
    <>
      {!isInstalled ? (
        <>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-300 mb-8 leading-relaxed">
            <p className="font-bold mb-2">How to install the anynotes bookmarklet:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Drag the button below <strong>to your bookmarks bar</strong>.
              </li>
              <li>
                Start bookmarking your first site using the bookmarklet button to complete install.
              </li>
            </ol>
          </div>
          <a
            ref={bookmarkletRef}
            draggable={true}
            className="select-none px-3 py-2 bg-blue-100 border border-blue-300 inline-block cursor-pointer no-underline text-blue-600 font-bold rounded mb-4 hover:bg-blue-200"
            title="Drag this link to your bookmarks bar"
          >
            Save to anynotes
          </a>
        </>
      ) : (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-300 mb-8 leading-relaxed">
          <p className="text-center text-gray-600">
            Use the bookmarklet button from any page to save it here.
          </p>
        </div>
      )}
    </>
  );
};
