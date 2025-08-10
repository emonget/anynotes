import { useState, useEffect } from 'react';
import { X, Tag, Layers, Globe, Calendar, Bookmark as BookmarkIcon, Star, Undo, FileText, BookOpen, Settings } from 'lucide-react';
import { WithContext as ReactTags, type Tag as ReactTag } from 'react-tag-input';
import { motion } from 'framer-motion';

import type { Bookmark } from '../DropZone';
import { StarRating } from './StarRating';

export const EditSidePanel = ({ bookmark, onClose, onSave }: {
  bookmark: Bookmark;
  onClose: () => void;
  onSave: (updated: Bookmark) => void;
}) => {
  const normalize = (b: Bookmark) => ({
    ...b,
    categories: {
      topics: b.categories?.topics || [],
      project: b.categories?.project || undefined,
      sourceType: b.categories?.sourceType || undefined,
      importance: b.categories?.importance || undefined,
    },
  });

  const [original, setOriginal] = useState<Bookmark>(() => normalize(bookmark));
  const [edited, setEdited] = useState<Bookmark>(() => normalize(bookmark));

  useEffect(() => {
    const normalized = normalize(bookmark);
    setOriginal(normalized);
    setEdited(normalized);
  }, [bookmark]);

  const hasChanges = JSON.stringify(original) !== JSON.stringify(edited);

  const handleUndo = () => {
    setEdited(original);
  };

  const handleAddTag = (tag: ReactTag) => {
    setEdited((prev: Bookmark) => ({
      ...prev,
      categories: {
        ...prev.categories,
        topics: [...prev.categories.topics, tag.text]
      }
    }));
  };

  const handleDeleteTag = (i: number) => {
    if (!edited.categories?.topics) return;
    setEdited((prev: Bookmark) => ({
      ...prev,
      categories: {
        ...prev.categories,
        topics: prev.categories.topics.filter((_, idx: number) => idx !== i)
      }
    }));
  };



  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-96 bg-gray-50 shadow-xl z-50 overflow-y-auto p-6"
    >
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Edit Bookmark</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {/* Page Section */}
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
            <BookOpen className="w-5 h-5" /> Page
          </label>
          <div className="space-y-2">
            <div className="relative">
              <FileText className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                value={edited.title}
                className="w-full p-2 pl-10 rounded bg-gray-100 text-gray-500"
                placeholder="Bookmark title"
                disabled
              />
            </div>
            <div className="relative">
              <Globe className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                value={edited.url}
                className="w-full p-2 pl-10 rounded bg-gray-100 text-gray-500"
                disabled
              />
            </div>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                value={new Date(edited.timestamp).toLocaleString()}
                className="w-full p-2 pl-10 rounded bg-gray-100 text-gray-500"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Topics Input */}
        <div className="mb-4">
          <label className="flex items-center justify-between mb-1 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5" /> Topics
            </div>
            <button
              onClick={() => console.log('topics settings')}
              className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 transition-colors"
              title="Configure topics"
            >
              <Settings className="w-4 h-4" />
            </button>
          </label>
          <ReactTags
            tags={edited.categories.topics.map((t, i) => ({
              id: i.toString(), 
              text: t,
              className: ''
            }))}
            handleAddition={handleAddTag}
            handleDelete={handleDeleteTag}
            inputFieldPosition="bottom"
            placeholder="Add topic (press enter)"
            autocomplete
            classNames={{
              tags: 'react-tags',
              tagInput: 'react-tags-input',
              tag: 'react-tag',
              remove: 'react-tag-remove',
            }}
          />
        </div>

        {/* Project Input */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Layers className="w-5 h-5" /> Project
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={edited.categories.project || ''}
                onChange={(e) => setEdited({
                  ...edited,
                  categories: {
                    ...edited.categories,
                    project: e.target.value
                  }
                })}
                className="w-48 p-2 rounded bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project name"
              />
              <button
                onClick={() => console.log('project settings')}
                className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 transition-colors"
                title="Configure projects"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Source Type */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <BookmarkIcon className="w-5 h-5" /> Source
            </label>
            <select
              value={edited.categories?.sourceType || ''}
              onChange={(e) => setEdited({
                ...edited,
                categories: {
                  ...edited.categories,
                  sourceType: e.target.value as 'Blog'|'Article'|'Tool'|'Other'
                }
              })}
              className="w-48 p-2 rounded bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="Blog">Blog</option>
              <option value="Article">Article</option>
              <option value="Tool">Tool</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Importance */}
        <div className="mb-4">
          <label className="flex items-center justify-between mb-2 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" /> Importance
            </div>
            <StarRating
              value={edited.categories?.importance}
              onChange={(rating) => setEdited({
                ...edited,
                categories: {
                  ...edited.categories,
                  importance: rating
                }
              })}
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-200">
          <button
            onClick={handleUndo}
            disabled={!hasChanges}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo className="w-4 h-4" /> Undo
          </button>
          <button
            onClick={() => onSave(edited)}
            disabled={!hasChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>

    </motion.div>
  );
};