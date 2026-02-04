import { useState } from 'react';
import { Link } from 'react-router-dom';

// PDF folders with actual Google Drive links
const pdfFolders = [
  { 
    id: '0001', 
    name: 'Folder 0001', 
    link: 'https://drive.google.com/drive/folders/1WEbAIwUCDR1Lv5bMQmasmnBYYYZC0imT',
    description: 'Document batch 1',
    color: 'from-amber-600 to-orange-700'
  },
  { 
    id: '0002', 
    name: 'Folder 0002', 
    link: 'https://drive.google.com/drive/folders/1hAsbwxLT8CyMoWSwEdfq3n4k8Q1ltzgq',
    description: 'Document batch 2',
    color: 'from-red-600 to-rose-700'
  },
  { 
    id: '0003', 
    name: 'Folder 0003', 
    link: 'https://drive.google.com/drive/folders/1Tf6CnXM70_F6ABIkrEg_JykXsCURSyGd',
    description: 'Document batch 3',
    color: 'from-purple-600 to-violet-700'
  },
  { 
    id: '0004', 
    name: 'Folder 0004', 
    link: 'https://drive.google.com/drive/folders/1lk5j9Hhhri--90uadIzlZF5h2269WXtP',
    description: 'Document batch 4',
    color: 'from-blue-600 to-indigo-700'
  },
  { 
    id: '0005', 
    name: 'Folder 0005', 
    link: 'https://drive.google.com/drive/folders/1zOgDN2hrD_XIoL--Qez1lMibXyymlrIn',
    description: 'Document batch 5',
    color: 'from-cyan-600 to-teal-700'
  },
  { 
    id: '0006', 
    name: 'Folder 0006', 
    link: 'https://drive.google.com/drive/folders/1Qfa8-Q2Yhk_wnW7oUnSrJhWHBCNZVGCE',
    description: 'Document batch 6',
    color: 'from-emerald-600 to-green-700'
  },
  { 
    id: '0007', 
    name: 'Folder 0007', 
    link: 'https://drive.google.com/drive/folders/1NQ7cf-wQcv-KW09f0mSVIgm-1kEK4SqJ',
    description: 'Document batch 7',
    color: 'from-lime-600 to-yellow-600'
  },
  { 
    id: '0008', 
    name: 'Folder 0008', 
    link: 'https://drive.google.com/drive/folders/1YqowKHcvoYWoNmHFSdjXiqEAh-vBCV-r',
    description: 'Document batch 8',
    color: 'from-pink-600 to-fuchsia-700'
  },
  { 
    id: '0009', 
    name: 'Folder 0009', 
    link: 'https://drive.google.com/drive/folders/19tlDDBKXSjXpfTJxWhyCcF1wper71Nhx',
    description: 'Document batch 9',
    color: 'from-orange-600 to-amber-600'
  },
  { 
    id: '0010', 
    name: 'Folder 0010', 
    link: 'https://drive.google.com/drive/folders/1pNz1VLW0BuU15Ifvh-NRjXB9DgR0JGJA',
    description: 'Document batch 10',
    color: 'from-rose-600 to-red-700'
  },
  { 
    id: '0011', 
    name: 'Folder 0011', 
    link: 'https://drive.google.com/drive/folders/1sBsLI_pO1RP2qJH9aLY73dwOWTg0UMo4',
    description: 'Document batch 11',
    color: 'from-violet-600 to-purple-700'
  },
];

// Savage quotes
const savageQuotes = [
  "The paper trail they hoped would burn.",
  "Documents don't forget. Neither should we.",
  "Every signature tells a story.",
  "The receipts are eternal.",
];

function PDFsPage() {
  const [hoveredFolder, setHoveredFolder] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-orange-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group mb-4 sm:mb-6">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500/20 rounded-lg ring-1 ring-amber-500/30">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9v6h2v-6h3l-4-4-4 4h3z"/>
                  </svg>
                </div>
                <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">Document Archive</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                PDF Documents
                <span className="text-amber-500">.</span>
              </h1>
              <p className="text-gray-400 mt-2 sm:mt-3 text-base sm:text-lg">
                Browse <span className="text-white font-semibold">{pdfFolders.length}</span> folders of official documents
              </p>
              <p className="text-amber-500/70 mt-2 italic text-xs sm:text-sm">"{savageQuotes[0]}"</p>
            </div>

            {/* Stats cards - hidden on mobile, shown on larger screens */}
            <div className="hidden sm:flex gap-3 sm:gap-4">
              <div className="px-4 sm:px-5 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
                <p className="text-xl sm:text-2xl font-bold text-white">{pdfFolders.length}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">Folders</p>
              </div>
              <div className="px-4 sm:px-5 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
                <p className="text-xl sm:text-2xl font-bold text-white">PDF</p>
                <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">Format</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-500/10 border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-amber-200/80 text-xs sm:text-sm">
              Click any folder to open it in Google Drive. All documents are publicly accessible.
            </p>
          </div>
        </div>
      </div>

      {/* Folders Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {pdfFolders.map((folder, index) => (
            <a
              key={folder.id}
              href={folder.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              onMouseEnter={() => setHoveredFolder(folder.id)}
              onMouseLeave={() => setHoveredFolder(null)}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${folder.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-amber-500/50 transition-all duration-300">
                {/* Top gradient bar */}
                <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${folder.color}`} />
                
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    {/* Folder icon */}
                    <div className={`p-2.5 sm:p-3 bg-gradient-to-br ${folder.color} rounded-xl shadow-lg`}>
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                      </svg>
                    </div>
                    
                    {/* Open icon */}
                    <div className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-base sm:text-lg mt-3 sm:mt-4">{folder.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">{folder.description}</p>
                  
                  {/* Bottom info */}
                  <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
                    <span className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">Google Drive</span>
                    <span className="text-amber-400 text-xs sm:text-sm font-medium group-hover:underline">
                      Open Folder →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom savage quote */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-block px-4 sm:px-6 py-3 sm:py-4 bg-white/5 rounded-xl ring-1 ring-white/10">
            <p className="text-gray-400 text-xs sm:text-sm italic">
              "Every document tells a story. Every folder hides a truth."
            </p>
          </div>
        </div>

        {/* Download all section */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-2xl ring-1 ring-amber-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Want all documents?
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Access all folders directly through Google Drive for bulk download
              </p>
            </div>
            <a
              href="https://drive.google.com/drive/folders/1WEbAIwUCDR1Lv5bMQmasmnBYYYZC0imT"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors text-center text-sm sm:text-base"
            >
              Open Main Drive
            </a>
          </div>
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-8 sm:h-12" />
    </div>
  );
}

export default PDFsPage;
