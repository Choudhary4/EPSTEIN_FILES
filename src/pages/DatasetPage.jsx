import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { videosByDataset, datasets } from '../data/videos';
import VideoModal from '../components/VideoModal';

// Generate unique thumbnail style based on video name
const getThumbnailStyle = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;
  const x = Math.abs((hash >> 8) % 100);
  const y = Math.abs((hash >> 16) % 100);
  
  return {
    background: `linear-gradient(135deg, hsl(${hue1}, 60%, 15%) 0%, hsl(${hue2}, 50%, 8%) 50%, hsl(${hue1}, 40%, 5%) 100%)`,
    x, y
  };
};

const DatasetPage = () => {
  const { datasetId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  // Decode dataset name from URL
  const datasetName = decodeURIComponent(datasetId);
  const allVideos = videosByDataset[datasetName] || [];

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let result = [...allVideos];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(query) ||
        v.format.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'format') return a.format.localeCompare(b.format);
      return a.id - b.id;
    });

    return result;
  }, [allVideos, searchQuery, sortBy]);

  const handlePlay = (video) => setSelectedVideo(video);
  const handleCloseModal = () => setSelectedVideo(null);

  // Get format stats
  const formatStats = useMemo(() => {
    const stats = {};
    allVideos.forEach(v => {
      stats[v.format] = (stats[v.format] || 0) + 1;
    });
    return stats;
  }, [allVideos]);

  const getFormatColor = (format) => {
    const colors = {
      mp4: 'bg-blue-500',
      m4v: 'bg-purple-500',
      mov: 'bg-green-500',
      avi: 'bg-orange-500',
      '3gp': 'bg-pink-500',
      ts: 'bg-yellow-500',
    };
    return colors[format] || 'bg-gray-500';
  };

  if (!allVideos.length) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Dataset not found</h1>
          <Link to="/" className="text-red-500 hover:text-red-400">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white text-lg font-bold">EPSTEIN<span className="text-red-500">FILES</span></span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search in this dataset..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-500"
            >
              <option value="name">Sort: Name</option>
              <option value="format">Sort: Format</option>
              <option value="id">Sort: ID</option>
            </select>

            <div className="flex bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Info */}
      <div className="px-6 md:px-16 lg:px-24 pt-10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-4 inline-block">
              DOJ RELEASE
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{datasetName}</h1>
            <p className="text-gray-500 text-lg">
              {allVideos.length} video files
            </p>
          </div>

          {/* Format Tags */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(formatStats).map(([format, count]) => (
              <span
                key={format}
                className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-gray-400 rounded-lg text-sm flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${getFormatColor(format)}`}></span>
                {format.toUpperCase()} ({count})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Results Info */}
      {searchQuery && (
        <div className="px-6 md:px-16 lg:px-24 pb-4">
          <p className="text-gray-400">
            Found {filteredVideos.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Video Grid/List */}
      <div className="px-6 md:px-16 lg:px-24 pb-16">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredVideos.map((video) => {
              const thumbStyle = getThumbnailStyle(video.name);
              return (
                <div
                  key={video.id}
                  className="cursor-pointer group"
                  onClick={() => handlePlay(video)}
                >
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group-hover:border-gray-600 transition-colors">
                    {/* Dynamic background */}
                    <div className="absolute inset-0" style={{ background: thumbStyle.background }} />
                    
                    {/* Glow effect */}
                    <div 
                      className="absolute w-24 h-24 rounded-full opacity-20 blur-2xl bg-white"
                      style={{ top: `${thumbStyle.y}%`, left: `${thumbStyle.x}%`, transform: 'translate(-50%, -50%)' }}
                    />
                    
                    {/* Film strip */}
                    <div className="absolute top-0 left-0 right-0 h-2.5 flex">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex-1 flex items-center justify-center">
                          <div className="w-1.5 h-1 bg-black/40 rounded-sm" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-2.5 flex">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex-1 flex items-center justify-center">
                          <div className="w-1.5 h-1 bg-black/40 rounded-sm" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Center play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <svg className="w-4 h-4 text-white/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* ID watermark */}
                    <div className="absolute bottom-3 left-2 text-white/20 text-[8px] font-mono">
                      {video.name.slice(-8)}
                    </div>
                    
                    <span className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase text-white ${getFormatColor(video.format)}`}>
                      {video.format}
                    </span>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 px-1">
                    <h3 className="text-white text-sm font-medium truncate group-hover:text-red-400 transition-colors">
                      {video.name}
                    </h3>
                    <p className="text-gray-600 text-xs">{video.format.toUpperCase()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => handlePlay(video)}
                className="flex items-center gap-4 p-4 bg-gray-900/50 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors group border border-gray-800/50"
              >
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate group-hover:text-red-400 transition-colors">{video.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase text-white ${getFormatColor(video.format)}`}>
                  {video.format}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-white text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-gray-500">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default DatasetPage;
