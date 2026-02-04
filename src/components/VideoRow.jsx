import { useRef } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';

const VideoRow = ({ title, videos, onPlay, showSeeAll = true, totalCount }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (videos.length === 0) return null;

  const count = totalCount || videos.length;

  return (
    <div className="mb-12 group/row">
      {/* Row Header */}
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 mb-5">
        <Link 
          to={`/dataset/${encodeURIComponent(title)}`}
          className="flex items-center gap-3 group/title"
        >
          <h2 className="text-white text-xl md:text-2xl font-bold group-hover/title:text-red-500 transition-colors">
            {title}
          </h2>
          <span className="text-gray-600 text-sm">({count} videos)</span>
          <svg className="w-5 h-5 text-red-500 opacity-0 group-hover/title:opacity-100 transform translate-x-0 group-hover/title:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {showSeeAll && (
          <Link 
            to={`/dataset/${encodeURIComponent(title)}`}
            className="flex items-center gap-2 text-gray-500 hover:text-white text-sm font-medium transition-colors"
          >
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Videos Slider */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/80 border border-gray-700 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black hover:border-gray-500"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Videos Container */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-16 lg:px-24 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={onPlay} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/80 border border-gray-700 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black hover:border-gray-500"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoRow;
