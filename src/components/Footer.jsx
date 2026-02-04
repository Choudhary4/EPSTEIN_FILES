import { Link } from 'react-router-dom';
import { datasets, videos } from '../data/videos';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black via-[#0a0a0a] to-[#0a0a0a] py-16 px-4 md:px-12 mt-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
          {/* Logo & Description */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white text-xl font-black tracking-wide">
                EPSTEIN <span className="text-red-500">FILES</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Complete video catalogue viewer for files released by the U.S. Department of Justice. 
              Browse {videos.length} video files across {datasets.length} datasets.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Browse</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-500 text-sm hover:text-red-500 transition-colors">
                    All Videos
                  </Link>
                </li>
                <li>
                  <Link to="/pdfs" className="text-gray-500 text-sm hover:text-amber-500 transition-colors flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                    </svg>
                    PDF Documents
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Datasets</h4>
              <ul className="space-y-2">
                {datasets.map(ds => (
                  <li key={ds}>
                    <Link 
                      to={`/dataset/${encodeURIComponent(ds)}`} 
                      className="text-gray-500 text-sm hover:text-red-500 transition-colors"
                    >
                      {ds}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Formats</h4>
              <ul className="space-y-2">
                <li className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> MP4
                </li>
                <li className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span> M4V
                </li>
                <li className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> MOV
                </li>
                <li className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span> AVI
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Source</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-red-500 transition-colors flex items-center gap-1">
                    DOJ Epstein Page
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://www.justice.gov" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-red-500 transition-colors flex items-center gap-1">
                    Department of Justice
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            Video files are sourced directly from justice.gov. This is an unofficial viewer.
          </p>
          <p className="text-gray-600 text-xs">
            Built for public transparency
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
