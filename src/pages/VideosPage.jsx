import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { videos, datasets } from '../data/videos';
import VideoModal from '../components/VideoModal';

// Savage quotes for videos
const savageQuotes = [
  "1,994 reasons why the powerful should be nervous.",
  "Surveillance footage they hoped would disappear.",
  "The cameras never blink. Neither should you.",
  "Every frame tells a story they tried to hide.",
];

// Generate a consistent color based on video name
function getVideoGradient(name) {
  const gradients = [
    'from-red-900 via-red-800 to-gray-900',
    'from-blue-900 via-indigo-800 to-gray-900',
    'from-purple-900 via-violet-800 to-gray-900',
    'from-emerald-900 via-teal-800 to-gray-900',
    'from-amber-900 via-orange-800 to-gray-900',
    'from-pink-900 via-rose-800 to-gray-900',
    'from-cyan-900 via-sky-800 to-gray-900',
    'from-lime-900 via-green-800 to-gray-900',
  ];
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

// Get timestamp-like display from video name
function getTimestamp(name) {
  const num = parseInt(name.replace(/\D/g, '').slice(-4)) || 0;
  const hours = Math.floor(num / 3600) % 24;
  const mins = Math.floor((num % 3600) / 60);
  const secs = num % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Video Thumbnail Component
function VideoThumbnail({ video, onClick }) {
  const gradient = getVideoGradient(video.name);
  const timestamp = getTimestamp(video.name);
  
  return (
    <div
      onClick={() => onClick(video)}
      className="group relative aspect-video cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:z-10"
    >
      {/* Card glow */}
      <div className="absolute inset-0 rounded-xl bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

      {/* Card */}
      <div className={`relative h-full rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-red-500/50 transition-all duration-300 shadow-lg group-hover:shadow-red-500/20 bg-gradient-to-br ${gradient}`}>
        {/* Scanlines effect */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
        }} />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />
        
        {/* Camera frame overlay */}
        <div className="absolute inset-0 border-2 border-white/5 m-2 rounded-lg" />
        
        {/* Recording indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-[10px] font-mono font-bold tracking-wider">REC</span>
        </div>
        
        {/* Top right badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-red-600/90 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase">
            {video.format?.replace('\r', '') || 'MP4'}
          </span>
        </div>
        
        {/* Center video icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-white/20 rounded-full scale-[1.8] group-hover:scale-[2.2] transition-transform duration-300" />
            {/* Play button */}
            <div className="p-4 bg-black/50 backdrop-blur-sm rounded-full group-hover:bg-red-600/80 transition-all duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Timestamp overlay */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded font-mono text-white text-xs">
          {timestamp}
        </div>
        
        {/* Duration/Size indicator */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-gray-300 text-[10px] font-medium">
          SURVEILLANCE
        </div>
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Video info - appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-sm font-bold truncate">{video.name}</p>
          <p className="text-gray-400 text-xs">{video.dataset}</p>
        </div>
      </div>
    </div>
  );
}

function VideosPage() {
  const [selectedDataset, setSelectedDataset] = useState('All Datasets');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const videosPerPage = 30;

  const filteredVideos = useMemo(() => {
    let result = videos;

    if (selectedDataset !== 'All Datasets') {
      result = result.filter(v => v.dataset === selectedDataset);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(query) ||
        v.dataset.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedDataset, searchQuery]);

  const paginatedVideos = useMemo(() => {
    const startIdx = (currentPage - 1) * videosPerPage;
    return filteredVideos.slice(startIdx, startIdx + videosPerPage);
  }, [filteredVideos, currentPage]);

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDataset, searchQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePlay = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors group mb-6">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-500/20 rounded-lg ring-1 ring-red-500/30">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-red-400 text-sm font-semibold tracking-wider uppercase">Surveillance Archive</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Video Files
                <span className="text-red-500">.</span>
              </h1>
              <p className="text-gray-400 mt-3 text-lg">
                Browse <span className="text-white font-semibold">{videos.length.toLocaleString()}</span> surveillance videos from the DOJ release
              </p>
              <p className="text-red-500/70 mt-2 italic text-sm">"{savageQuotes[0]}"</p>
            </div>

            {/* Stats cards */}
            <div className="flex gap-4">
              <div className="px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
                <p className="text-2xl font-bold text-white">{filteredVideos.length.toLocaleString()}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Videos</p>
              </div>
              <div className="px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
                <p className="text-2xl font-bold text-white">{datasets.length}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Datasets</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Dataset Filter */}
            <div className="relative">
              <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="appearance-none bg-white/5 text-white pl-4 pr-10 py-2.5 rounded-xl ring-1 ring-white/10 hover:ring-red-500/50 focus:ring-red-500 focus:outline-none transition-all cursor-pointer text-sm font-medium"
              >
                <option value="All Datasets" className="bg-gray-900">All Datasets</option>
                {datasets.map(ds => (
                  <option key={ds} value={ds} className="bg-gray-900">{ds}</option>
                ))}
              </select>
              <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 text-white pl-10 pr-4 py-2.5 rounded-xl ring-1 ring-white/10 placeholder-gray-500 focus:ring-red-500 focus:outline-none transition-all text-sm"
              />
              <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 ml-auto bg-white/5 rounded-xl p-1 ring-1 ring-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Page info */}
            <div className="text-gray-500 text-sm">
              Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">{totalPages}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedVideos.map((video) => (
              <VideoThumbnail key={video.id} video={video} onClick={handlePlay} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {paginatedVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => handlePlay(video)}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-xl ring-1 ring-white/10 hover:ring-red-500/50 cursor-pointer transition-all group"
              >
                <div className={`w-24 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br ${getVideoGradient(video.name)} flex items-center justify-center relative`}>
                  <div className="absolute top-1 left-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 text-[8px] font-mono font-bold">REC</span>
                  </div>
                  <svg className="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="absolute bottom-1 right-1 text-[8px] text-white/70 font-mono">{getTimestamp(video.name).slice(3)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{video.name}</p>
                  <p className="text-gray-500 text-sm">{video.dataset} • {video.format?.replace('\r', '')}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-red-400 text-sm font-medium">Play</span>
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {paginatedVideos.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No videos found</p>
            <p className="text-gray-600 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-red-500/50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-red-500/50 transition-all text-sm font-medium"
            >
              Previous
            </button>

            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                      page === currentPage
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 ring-1 ring-white/10'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-red-500/50 transition-all text-sm font-medium"
            >
              Next
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-red-500/50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={closeModal} />
      )}
    </div>
  );
}

export default VideosPage;
