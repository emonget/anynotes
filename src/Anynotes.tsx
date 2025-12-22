import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EditSidePanel } from './UI/EditSidePanel';
import { Toolbar } from './UI/Toolbar';
import { BookmarkList } from './UI/BookmarkList';
import { InstallBanner } from './UI/InstallBanner';

export enum MatchingState {
  Unmatched = 'Unmatched',
  Matched = 'Matched',
  Overridden = 'Overridden'
}

export interface Bookmark {
  id?: string;
  title: string;
  url: string;
  timestamp: number;
  categories: {
    topics: string[];
    project?: string;
    sourceType?: 'Blog' | 'Article' | 'Tool' | 'Other';
    importance?: number; // 1-5 stars
  };
  state: MatchingState;
}

export const Anynotes = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(true);

  const loadBookmarks = () => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  };

  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  useEffect(() => {
    const installed = localStorage.getItem('app-local-installation') === 'true';
    setIsInstalled(installed);

    const confirmation = localStorage.getItem('app-save-confirmation');
    setShowSaveConfirmation(confirmation ? JSON.parse(confirmation) : true);

    window.name = 'anynotes-sink';
    loadBookmarks();

    const handleMessage = (event: MessageEvent) => {
      console.log('Received message:', event);
      const data = event.data;
      if (data && data.title && data.url) {
        const stored = localStorage.getItem('bookmarks') || '[]';
        let currentBookmarks = JSON.parse(stored);
        const timestamp = Date.now();

        if (!currentBookmarks.some((b: Bookmark) => b.url === data.url)) {
          const bookmarkData = {
            ...data,
            timestamp,
            categories: {
              topics: [],
              project: undefined,
              sourceType: undefined,
              importance: undefined
            },
            state: MatchingState.Unmatched
          };
          currentBookmarks.push(bookmarkData);
          saveBookmarks(currentBookmarks);
          console.log('Saved bookmark:', bookmarkData);

          if (event.source) {
            const confirmation = localStorage.getItem('app-save-confirmation');
            const showConfirmation = confirmation ? JSON.parse(confirmation) : true;
            event.source.postMessage({ status: 'success', showConfirmation }, event.origin as any);
          }

          if (!isInstalled) {
            localStorage.setItem('app-local-installation', 'true');
            setIsInstalled(true);
          }
          setTimeout(() => window.close(), 300);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleExport = () => {
    const bookmarksJson = localStorage.getItem('bookmarks') || '[]';
    const blob = new Blob([bookmarksJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'anynotes-bookmarks.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (!Array.isArray(imported)) throw new Error('JSON must be an array');

        const stored = localStorage.getItem('bookmarks') || '[]';
        let currentBookmarks = JSON.parse(stored);

        imported.forEach((imp: any) => {
          if (
            imp.title &&
            imp.url &&
            imp.timestamp &&
            !currentBookmarks.some((b: Bookmark) => b.url === imp.url && b.timestamp === imp.timestamp)
          ) {
            currentBookmarks.push(imp);
          }
        });

        saveBookmarks(currentBookmarks);
        alert('Imported bookmarks successfully!');
      } catch (err) {
        alert('Failed to import bookmarks: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const bookmarkletRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anynotesUrl = window.location.href;
    const bookmarkletCode = `javascript:(() => {
    const data = {
        title: document.title,
        url: location.href
    };

    const receiver = window.open('${anynotesUrl}', 'anynotes-sink');
    if (!receiver) {
        alert('Could not open Anynotes. Is popup blocked?');
        return;
    }

    const messageListener = (event) => {
        if (event.source === receiver && event.data.status === 'success') {
            if (event.data.showConfirmation) {
                alert('Bookmark saved to Anynotes!');
            }
            window.removeEventListener('message', messageListener);
        }
    };

    window.addEventListener('message', messageListener);

    setTimeout(() => {
        receiver.postMessage(data, '*');
    }, 800);
})();`;
    if (bookmarkletRef.current) {
      bookmarkletRef.current.href = bookmarkletCode;
    }
  }, [isInstalled]);

  const handleDelete = (index: number) => {
    const newBookmarks = [...bookmarks];
    newBookmarks.splice(index, 1);
    saveBookmarks(newBookmarks);
  };

  const handleSelectBookmark = (bookmark: Bookmark, index: number) => {
    setSelectedBookmark({
      ...bookmark,
      id: String(index),
      categories: {
        topics: bookmark.categories?.topics || [],
        project: bookmark.categories?.project,
        sourceType: bookmark.categories?.sourceType,
        importance: bookmark.categories?.importance,
      },
    });
    setIsPanelOpen(true);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('bookmarks');
      localStorage.removeItem('app-local-installation');
      setBookmarks([]);
      setIsInstalled(false);
      setShowConfig(false);
    }
  };

  return (
    <>
      <div className="font-sans max-w-3xl mx-auto mt-8 px-4 text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-blue-600 text-3xl font-bold">Anynotes</h1>
          <Toolbar
            showConfig={showConfig}
            setShowConfig={setShowConfig}
            handleImport={handleImport}
            handleExport={handleExport}
            handleClearData={handleClearData}
            showSaveConfirmation={showSaveConfirmation}
            setShowSaveConfirmation={setShowSaveConfirmation}
          />
        </div>

        <InstallBanner isInstalled={isInstalled} bookmarkletRef={bookmarkletRef} />

        <BookmarkList
          bookmarks={bookmarks}
          handleDelete={handleDelete}
          onSelectBookmark={handleSelectBookmark}
        />

      </div>
      <AnimatePresence>
        {isPanelOpen && selectedBookmark && (
          <EditSidePanel
            bookmark={{
              ...selectedBookmark,
              state: selectedBookmark.state || MatchingState.Overridden
            }}
            onClose={() => setIsPanelOpen(false)}
            onSave={(updated) => {
              if (!updated.id) return;
              const updatedBookmarks = [...bookmarks];
              const index = parseInt(updated.id, 10);
              if (!isNaN(index) && index >= 0 && index < updatedBookmarks.length) {
                const { id, ...bookmarkToSave } = updated;
                updatedBookmarks[index] = bookmarkToSave;
              }
              saveBookmarks(updatedBookmarks);
              setSelectedBookmark(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
