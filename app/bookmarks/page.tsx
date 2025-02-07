'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function BookmarksPage() {
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Project[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarkedProjects');
    if (storedBookmarks) {
      setBookmarkedProjects(JSON.parse(storedBookmarks));
    }
  }, []);

  // Remove a project from bookmarks
  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarkedProjects.filter(
      (project) => project.id !== id
    );
    setBookmarkedProjects(updatedBookmarks);
    localStorage.setItem(
      'bookmarkedProjects',
      JSON.stringify(updatedBookmarks)
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-yellow-500" /> Bookmarked Projects
      </h1>

      {bookmarkedProjects.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarkedProjects.map((project) => (
            <li
              key={project.id}
              className="p-4 border rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
              <button
                onClick={() => removeBookmark(project.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
