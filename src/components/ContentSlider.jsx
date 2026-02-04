import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
  ];
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

// Generic slider card for different content types
function SliderCard({ item, type, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getContent = () => {
    switch (type) {
      case 'video':
        return {
          title: item.name,
          subtitle: item.dataset,
          badge: item.format?.replace('\r', ''),
          badgeColor: 'bg-red-600',
          accentColor: 'red',
          isVideo: true,
          gradient: getVideoGradient(item.name),
        };
      case 'image':
        return {
          title: item.id,
          subtitle: item.volume,
          badge: `Folder ${item.folder}`,
          badgeColor: 'bg-emerald-600',
          accentColor: 'emerald',
          thumbnail: item.thumbnail,
        };
      case 'pdf':
        return {
          title: item.name,
          subtitle: `${item.files} files`,
          badge: 'PDF',
          badgeColor: 'bg-amber-600',
          accentColor: 'amber',
          icon: (
            <svg className="w-12 h-12 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9v6h2v-6h3l-4-4-4 4h3z"/>
            </svg>
          ),
        };
      default:
        return {};
    }
  };

  const content = getContent();

  return (
    <div
      className="flex-shrink-0 w-[200px] md:w-[240px] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(item)}
    >
      <div className={`relative aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 transform ${isHovered ? 'scale-105 z-20' : 'scale-100'}`}>
        {/* Glow effect on hover */}
        <div className={`absolute -inset-2 bg-${content.accentColor}-500/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Card content */}
        <div className="relative h-full rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-white/30 transition-all bg-gray-900">
          {/* Video card with surveillance style */}
          {type === 'video' ? (
            <div className={`absolute inset-0 bg-gradient-to-br ${content.gradient}`}>
              {/* Scanlines */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
              }} />
              {/* Noise */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
              }} />
              {/* REC indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-[10px] font-mono font-bold">REC</span>
              </div>
              {/* Center play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 bg-black/40 backdrop-blur-sm rounded-full group-hover:bg-red-600/80 transition-all">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Timestamp */}
              <div className="absolute bottom-12 left-3 px-2 py-1 bg-black/60 rounded font-mono text-white text-[10px]">
                00:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
              </div>
            </div>
          ) : type === 'pdf' ? (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-gray-900 to-gray-900 flex items-center justify-center">
              {content.icon}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6TTIwIDIwaDIwdjIwSDIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            </div>
          ) : (
            <>
              {/* Skeleton */}
              {!imageLoaded && !hasError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
              )}
              {/* Error state */}
              {hasError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {/* Actual image */}
              <img
                src={content.thumbnail}
                alt={content.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setHasError(true)}
              />
            </>
          )}

          {/* Gradient overlay - only for non-video */}
          {type !== 'video' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          )}
          
          {/* Badge */}
          <div className={`absolute top-2 left-2 ${content.badgeColor} px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider`}>
            {content.badge}
          </div>

          {/* Play/View icon on hover - only for non-video (video has its own) */}
          {type !== 'video' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className={`p-3 ${content.badgeColor} rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white font-bold text-sm truncate">{content.title}</p>
            <p className="text-gray-400 text-xs truncate">{content.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main slider component
function ContentSlider({ title, items, type, link, linkText, onItemClick, accentColor = 'white', savageLine }) {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 800;
      const newScroll = sliderRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      sliderRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      setShowLeftArrow(sliderRef.current.scrollLeft > 0);
      setShowRightArrow(
        sliderRef.current.scrollLeft < sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10
      );
    }
  };

  const colorMap = {
    red: 'from-red-600 to-red-500 hover:from-red-500 hover:to-red-400',
    emerald: 'from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400',
    amber: 'from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400',
    white: 'from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400',
  };

  return (
    <div className="relative py-8 group/slider">
      {/* Header */}
      <div className="px-4 md:px-12 mb-4 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-white text-xl md:text-2xl font-bold">{title}</h2>
            {link && (
              <Link 
                to={link} 
                className={`text-sm text-${accentColor === 'white' ? 'gray-400' : accentColor + '-400'} hover:text-${accentColor === 'white' ? 'white' : accentColor + '-300'} transition-colors flex items-center gap-1 group`}
              >
                <span>{linkText || 'See All'}</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
          {savageLine && (
            <p className="text-gray-500 text-sm mt-1 italic">"{savageLine}"</p>
          )}
        </div>
        <span className="text-gray-600 text-sm">{items.length} items</span>
      </div>

      {/* Slider container */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:bg-black transition-all ${showLeftArrow ? 'opacity-0 group-hover/slider:opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:bg-black transition-all ${showRightArrow ? 'opacity-0 group-hover/slider:opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Scrollable content */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <SliderCard
              key={item.id || index}
              item={item}
              type={type}
              onClick={onItemClick}
            />
          ))}
          
          {/* See more card */}
          {link && (
            <Link 
              to={link}
              className="flex-shrink-0 w-[200px] md:w-[240px] aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-white/30 transition-all flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-900 to-gray-950 group cursor-pointer"
            >
              <div className={`p-4 bg-gradient-to-r ${colorMap[accentColor]} rounded-full group-hover:scale-110 transition-transform`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <span className="text-white font-bold">View All</span>
              <span className="text-gray-500 text-sm">{linkText}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentSlider;
