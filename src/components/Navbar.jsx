import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery, selectedDataset, setSelectedDataset, datasets }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800/50' 
        : 'bg-transparent'
    }`}>
      <div className="px-6 md:px-16 lg:px-24 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-white text-lg font-bold tracking-wide">
              EPSTEIN<span className="text-red-500">FILES</span>
            </span>
          </Link>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <div className="h-5 w-px bg-gray-700 mx-2" />
            <Link to="/" className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              Videos
            </Link>
            <Link to="/pdfs" className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z"/>
              </svg>
              PDFs
            </Link>
          </div>
          
          {/* Dataset Filter - Desktop */}
          {datasets && (
            <div className="hidden lg:flex items-center gap-3">
              <div className="h-5 w-px bg-gray-700" />
              <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="bg-gray-900/50 border border-gray-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-red-500 cursor-pointer hover:border-gray-600 transition-colors"
              >
                <option value="all">All Datasets</option>
                {datasets.map(ds => (
                  <option key={ds} value={ds}>{ds}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          {setSearchQuery && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900/50 border border-gray-700 text-white px-4 py-2 pl-10 rounded-lg text-sm focus:outline-none focus:border-red-500 w-44 md:w-64 transition-all placeholder-gray-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* DOJ Link */}
          <a 
            href="https://www.justice.gov/usao-sdny/pr/justice-department-releases-epstein-documents"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs text-gray-400 border border-gray-700 px-3 py-2 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            DOJ Source
          </a>
        </div>
      </div>

      {/* Mobile Dataset Filter */}
      {datasets && (
        <div className="lg:hidden px-6 pb-4">
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-red-500"
          >
            <option value="all">All Datasets</option>
            {datasets.map(ds => (
              <option key={ds} value={ds}>{ds}</option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
