import { useState, useMemo } from 'react';

const VideoCard = ({ video, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  // Generate unique visual pattern based on video name
  const thumbnailStyle = useMemo(() => {
    // Create a hash from the video name for consistent colors
    let hash = 0;
    const name = video.name || '';
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate hue from hash (0-360)
    const hue1 = Math.abs(hash % 360);
    const hue2 = (hue1 + 40) % 360;
    
    // Generate pattern position
    const x = Math.abs((hash >> 8) % 100);
    const y = Math.abs((hash >> 16) % 100);
    
    return {
      background: `
        linear-gradient(135deg, 
          hsl(${hue1}, 60%, 15%) 0%, 
          hsl(${hue2}, 50%, 8%) 50%,
          hsl(${hue1}, 40%, 5%) 100%
        )
      `,
      position: { x, y }
    };
  }, [video.name]);

  return (
    <div
      className="relative shrink-0 w-52 md:w-64 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(video)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group-hover:border-gray-600 transition-colors duration-200">
        {/* Dynamic colored background */}
        <div 
          className="absolute inset-0" 
          style={{ background: thumbnailStyle.background }}
        />
        
        {/* Decorative elements */}
        <div 
          className="absolute w-32 h-32 rounded-full opacity-20 blur-2xl"
          style={{ 
            background: 'white',
            top: `${thumbnailStyle.position.y}%`,
            left: `${thumbnailStyle.position.x}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Film strip effect */}
        <div className="absolute top-0 left-0 right-0 h-3 flex">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-1 flex items-center justify-center">
              <div className="w-2 h-1.5 bg-black/40 rounded-sm" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-3 flex">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-1 flex items-center justify-center">
              <div className="w-2 h-1.5 bg-black/40 rounded-sm" />
            </div>
          ))}
        </div>
        
        {/* Center play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg className="w-5 h-5 text-white/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Video ID watermark */}
        <div className="absolute bottom-4 left-3 text-white/20 text-[10px] font-mono">
          {video.name.slice(-8)}
        </div>

        {/* Format badge */}
        <span className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold uppercase text-white ${getFormatColor(video.format)}`}>
          {video.format}
        </span>

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg transform transition-transform duration-200 group-hover:scale-110">
            <svg className="w-7 h-7 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <h3 className="text-white text-sm font-medium truncate group-hover:text-red-400 transition-colors">
          {video.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 text-xs">{video.dataset}</span>
          <span className="text-gray-700">•</span>
          <span className="text-gray-600 text-xs uppercase">{video.format}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
