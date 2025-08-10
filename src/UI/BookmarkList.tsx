import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Bookmark } from '../DropZone';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  handleDelete: (index: number) => void;
  onSelectBookmark: (bookmark: Bookmark, index: number) => void;
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, handleDelete, onSelectBookmark }) => {
  return (
    <>
      <h2 className="text-blue-600 text-2xl font-bold mb-4">Saved bookmarks</h2>
      <ul className="list-none p-0">
        {bookmarks.length === 0 ? (
          <li>No bookmarks saved yet.</li>
        ) : (
          bookmarks.map((bookmark, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2 cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectBookmark(bookmark, index)}
            >
              <div>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-blue-600 font-semibold"
                >
                  {bookmark.title}
                </a>
                <small className="text-gray-600 ml-2 font-normal">
                  (saved at {new Date(bookmark.timestamp).toLocaleString()})
                </small>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className="text-gray-400 hover:text-gray-600"
                title="Delete bookmark"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
};
