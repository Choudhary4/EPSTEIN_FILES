import { useState } from 'react';
import { Link } from 'react-router-dom';

const DRIVE_FOLDER_ID = '1-uvHJPQwWbgh0pYreFSFimXM7X-hNz26';

// Folder list
const folders = [
  { id: '0001', name: '0001' },
  { id: '0002', name: '0002' },
  { id: '0003', name: '0003' },
  { id: '0004', name: '0004' },
  { id: '0005', name: '0005' },
  { id: '0006', name: '0006' },
  { id: '0007', name: '0007' },
  { id: '0008', name: '0008' },
  { id: '0009', name: '0009' },
  { id: '0010', name: '0010' },
  { id: '0011', name: '0011' },
];

const PDFsPage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [inputUrl, setInputUrl] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const mainEmbedUrl = `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#${viewMode}`;

  const handleViewPdf = () => {
    if (inputUrl) {
      // Extract file ID from various Google Drive URL formats
      let fileId = null;
      
      // Format: /file/d/FILE_ID/
      const match1 = inputUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      // Format: id=FILE_ID
      const match2 = inputUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      // Format: /open?id=FILE_ID
      const match3 = inputUrl.match(/open\?id=([a-zA-Z0-9_-]+)/);
      
      if (match1) fileId = match1[1];
      else if (match2) fileId = match2[1];
      else if (match3) fileId = match3[1];
      
      if (fileId) {
        setPdfUrl(`https://drive.google.com/file/d/${fileId}/preview`);
        setInputUrl('');
      } else {
        alert('Please paste a valid Google Drive PDF link');
      }
    }
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
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

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="hidden sm:flex bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <a
              href={`https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-400 border border-gray-700 px-3 py-2 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">Drive</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Left Sidebar */}
        <div className="w-72 bg-gray-950 border-r border-gray-800/50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-800/50">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">DOJ</span>
              <h2 className="text-white font-bold text-sm">PDF Documents</h2>
            </div>
            <p className="text-gray-600 text-xs">11 folders available</p>
          </div>

          {/* Folder List */}
          <div className="flex-1 overflow-y-auto p-2">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`w-full flex items-center gap-2 p-2.5 rounded-lg mb-1 text-sm transition-colors ${
                selectedFolder === null 
                  ? 'bg-amber-600/20 border border-amber-600/50 text-amber-400' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
              }`}
            >
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              </svg>
              All Documents
            </button>

            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-lg mb-1 text-sm transition-colors ${
                  selectedFolder?.id === folder.id 
                    ? 'bg-amber-600/20 border border-amber-600/50 text-amber-400' 
                    : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                }`}
              >
                <svg className="w-4 h-4 text-amber-600/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                </svg>
                Folder {folder.name}
              </button>
            ))}
          </div>

          {/* PDF URL Input */}
          <div className="p-3 border-t border-gray-800 bg-gray-900/50">
            <h3 className="text-white text-xs font-bold mb-2">📄 Open PDF Directly</h3>
            <p className="text-gray-500 text-[10px] mb-2 leading-relaxed">
              Copy a PDF link from the viewer, paste here to view it embedded on this page
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleViewPdf()}
                placeholder="Paste PDF link..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleViewPdf}
                disabled={!inputUrl}
                className="bg-amber-600 hover:bg-amber-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Embedded Drive */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Info Bar */}
          <div className="bg-amber-600 text-white px-4 py-2 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>To view a PDF:</strong> Double-click a folder → Right-click on PDF → "Get link" → Paste link in sidebar</span>
            </div>
          </div>

          {/* Drive Embed */}
          <iframe
            src={mainEmbedUrl}
            className="flex-1 w-full border-0"
            title="PDF Documents"
          />
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl h-[95vh] bg-gray-900 rounded-xl overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z"/>
                  </svg>
                </div>
                <span className="text-white font-medium">PDF Viewer</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl.replace('/preview', '/view')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white px-4 py-1.5 text-sm border border-gray-600 rounded-lg hover:border-gray-500 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in New Tab
                </a>
                <button
                  onClick={closePdfViewer}
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* PDF Content */}
            <div className="flex-1 bg-gray-700">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFsPage;
