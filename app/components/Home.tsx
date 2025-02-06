'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
};

interface HomeProps {
  toggleBookmark: (projectId: string) => void;
  bookmarkedProjects: string[];
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Story Builder',
    description: 'A collaborative storytelling app with AI-generated prompts',
    difficulty: 'Intermediate',
    tags: ['AI', 'Next.js'],
  },
  {
    id: '2',
    title: '3D Product Customizer',
    description: 'Customize 3D products in real-time',
    difficulty: 'Advanced',
    tags: ['GSAP', 'React Three Fiber'],
  },
  {
    id: '3',
    title: 'Interactive Roadmap Tracker',
    description: 'Track your learning journey interactively',
    difficulty: 'Beginner',
    tags: ['Next.js', 'TypeScript'],
  },
];

export default function Home({
  toggleBookmark,
  bookmarkedProjects,
}: HomeProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects
    .filter(
      (project) =>
        filter === 'all' || project.difficulty.toLowerCase() === filter
    )
    .filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-end mb-8 gap-4">
        {/* Filter Dropdown */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="projectType"
            className="text-gray-700 dark:text-gray-300 font-medium"
          >
            Filter by Level:
          </label>
          <select
            id="projectType"
            className="px-4 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gray-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder=" Search projects..."
            className="w-full p-3 border rounded-lg shadow-sm pl-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Project List */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {project.title}
              </h2>
              <button
                onClick={() => toggleBookmark(project.id)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    bookmarkedProjects.includes(project.id)
                      ? 'text-blue-500 fill-current'
                      : 'text-gray-500'
                  }`}
                />
              </button>
            </div>
            <p className="text-gray-500 dark:text-gray-400 my-2">
              {project.description}
            </p>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              🔹 {project.difficulty}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
