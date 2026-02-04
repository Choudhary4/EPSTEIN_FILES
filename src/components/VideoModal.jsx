const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  const handleOpenVideo = () => {
    window.open(video.url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl overflow-hidden z-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Thumbnail/Preview Area */}
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-600/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <button
              onClick={handleOpenVideo}
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Video
            </button>
            <p className="text-gray-500 text-sm mt-4">Opens in new tab</p>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold mb-3">{video.name}</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-red-600/20 text-red-500 rounded-full text-sm font-medium">
              {video.dataset}
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-white uppercase text-xs font-medium">
              {video.format}
            </span>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={handleOpenVideo}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Video
            </button>
            <a
              href={video.url}
              download
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              This video is part of the official DOJ release of Epstein Files.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Source: U.S. Department of Justice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
