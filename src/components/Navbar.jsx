import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery, selectedDataset, setSelectedDataset, datasets }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800/50' 
        : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-white text-base sm:text-lg font-bold tracking-wide">
              EPSTEIN<span className="text-red-500">FILES</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/videos" className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Videos
            </Link>
            <Link to="/images" className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              Images
            </Link>
            <Link to="/pdfs" className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z"/>
              </svg>
              PDFs
            </Link>
            
            {/* Dataset Filter - Desktop */}
            {datasets && (
              <>
                <div className="h-5 w-px bg-gray-700 mx-2" />
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
              </>
            )}
          </div>

          {/* Right side - Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input - Hidden on small mobile */}
            {setSearchQuery && (
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 text-white px-3 py-2 pl-9 rounded-lg text-sm focus:outline-none focus:border-red-500 w-32 md:w-48 lg:w-64 transition-all placeholder-gray-500"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            {/* DOJ Link - Desktop only */}
            <a 
              href="https://www.justice.gov/usao-sdny/pr/justice-department-releases-epstein-documents"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 text-xs text-gray-400 border border-gray-700 px-3 py-2 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              DOJ Source
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4 space-y-2">
            {/* Mobile Search */}
            {setSearchQuery && (
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 text-white px-4 py-3 pl-10 rounded-lg text-sm focus:outline-none focus:border-red-500 placeholder-gray-500"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            {/* Mobile Nav Links */}
            <Link 
              to="/videos" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-white px-3 py-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Videos</span>
              <span className="text-gray-500 text-sm ml-auto">1,994</span>
            </Link>
            <Link 
              to="/images" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-white px-3 py-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <span className="font-medium">Images</span>
              <span className="text-gray-500 text-sm ml-auto">4,101</span>
            </Link>
            <Link 
              to="/pdfs" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-white px-3 py-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z"/>
              </svg>
              <span className="font-medium">PDFs</span>
              <span className="text-gray-500 text-sm ml-auto">11 folders</span>
            </Link>

            {/* Mobile Dataset Filter */}
            {datasets && (
              <div className="pt-2 mt-2 border-t border-gray-800">
                <label className="text-gray-500 text-xs uppercase tracking-wider px-3 mb-2 block">Filter by Dataset</label>
                <select
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-red-500"
                >
                  <option value="all">All Datasets</option>
                  {datasets.map(ds => (
                    <option key={ds} value={ds}>{ds}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Mobile DOJ Link */}
            <a 
              href="https://www.justice.gov/usao-sdny/pr/justice-department-releases-epstein-documents"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 px-3 py-3 mt-2 border-t border-gray-800 pt-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-sm">View DOJ Source</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
