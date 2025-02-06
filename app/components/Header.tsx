'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Bookmark, User } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  bookmarkedCount: number;
}

// NavLink component for reusable navigation links
const NavLink = ({
  href,
  icon: Icon,
  label,
  badgeCount,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  badgeCount?: number;
}) => (
  <a
    href={href}
    className="relative flex items-center gap-2 hover:text-gray-900 transition-colors"
  >
    <Icon className="w-5 h-5" />
    {label}
    {badgeCount && badgeCount > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {badgeCount}
      </span>
    )}
  </a>
);

export default function Header({
  toggleTheme,
  isDarkMode,
  bookmarkedCount,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 shadow bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {/* Logo */}
      <motion.h1
        className="text-2xl font-bold dark:text-white"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        🚀 BuildSpark
      </motion.h1>

      {/* Navbar Links */}
      <nav className="flex items-center gap-6 dark:text-white ">
        {/* Bookmarks Link */}
        <NavLink
          href="/bookmarks"
          icon={Bookmark}
          label="Bookmarks"
          badgeCount={bookmarkedCount}
        />

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {/* Sign In Link */}
        <NavLink href="/auth" icon={User} label="Sign In" />
      </nav>
    </header>
  );
}
