'use client';

import { useState, useEffect } from 'react';
import Home from './components/Home';
import Header from './components/Header';

const Page: React.FC = () => {
  // Load theme from localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false; // Default to light mode if localStorage is not available
  });

  // Load bookmarked projects from localStorage
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('bookmarks') || '[]');
    }
    return []; // Default to empty array if localStorage is not available
  });

  // Toggle dark mode and store in localStorage
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  // Function to handle bookmarks
  const toggleBookmark = (projectId: string) => {
    setBookmarkedProjects((prev) => {
      const updatedBookmarks = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId) // Remove bookmark
        : [...prev, projectId]; // Add bookmark

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  // State to track if the component is mounted
  const [mounted, setMounted] = useState<boolean>(false);

  // Apply dark mode class to the root element after the component has mounted
  useEffect(() => {
    setMounted(true); // Set mounted state to true after initial render

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Don't render anything until the component has mounted to prevent hydration mismatch
  if (!mounted) {
    return <></>;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        bookmarkedCount={bookmarkedProjects.length}
      />
      <Home
        toggleBookmark={toggleBookmark}
        bookmarkedProjects={bookmarkedProjects}
      />
    </div>
  );
};

export default Page;
