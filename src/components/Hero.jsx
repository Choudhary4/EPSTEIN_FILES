import { Link } from 'react-router-dom';
import { videos, datasets } from '../data/videos';

const Hero = ({ onPlay }) => {
  const featuredVideo = videos[0];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        
        {/* Subtle red accent glow */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-800/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} 
        />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl pt-20">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-md uppercase tracking-wider">
              DOJ Official Release
            </span>
            <span className="text-gray-400 text-sm border border-gray-700/50 bg-gray-900/50 px-4 py-2 rounded-md backdrop-blur-sm">
              Complete Video Archive
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
            EPSTEIN
            <br />
            <span className="text-red-600">FILES</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
            Complete archive from the Department of Justice release. 
            Browse through <span className="text-white font-bold">{videos.length.toLocaleString()}</span> video files 
            and <span className="text-white font-bold">11 folders</span> of PDF documents.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mb-12">
            <div className="flex items-center gap-4 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl px-6 py-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-black text-white">{videos.length.toLocaleString()}</p>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Videos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl px-6 py-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-black text-white">{datasets.length}</p>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Datasets</p>
              </div>
            </div>

            <Link to="/pdfs" className="flex items-center gap-4 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl px-6 py-4 hover:border-amber-600/50 transition-colors">
              <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9v6h2v-6h3l-4-4-4 4h3z"/>
                </svg>
              </div>
              <div>
                <p className="text-3xl font-black text-white">11</p>
                <p className="text-gray-500 text-sm uppercase tracking-wider">PDF Folders</p>
              </div>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onPlay(featuredVideo)}
              className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play First Video
            </button>
            
            <Link
              to="/pdfs"
              className="flex items-center gap-3 bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-500 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9v6h2v-6h3l-4-4-4 4h3z"/>
              </svg>
              View PDFs
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-gray-600 text-xs uppercase tracking-widest font-medium">Explore Videos</span>
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
