import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  people, 
  collections, 
  getImagesRange, 
  getPersonImages, 
  getImageById,
  getAllValidImageNumbers,
  totalImages 
} from '../data/images';

// Optimized Lazy Image Component
function LazyImage({ src, alt, className, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`} onClick={onClick}>
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-gray-700 border-t-emerald-500 animate-spin" />
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex flex-col items-center justify-center gap-2">
          <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-500 text-xs font-mono">{alt?.slice(-8)}</span>
        </div>
      )}
      
      {/* Image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover rounded-xl transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

// Image Card Component
function ImageCard({ image, onClick, index }) {
  return (
    <div
      onClick={() => onClick(image)}
      className="group relative aspect-[3/4] cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:z-10"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Card container with glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      
      {/* Main card */}
      <div className="relative h-full rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all duration-300 shadow-lg group-hover:shadow-emerald-500/20">
        <LazyImage
          src={image.thumbnail}
          alt={image.id}
          className="w-full h-full"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Top badge */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
          <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-[10px] font-medium text-emerald-400 ring-1 ring-emerald-500/30">
            {image.volume}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(image.thumbnail, '_blank');
            }}
            className="p-1.5 bg-black/70 backdrop-blur-sm rounded-md text-white hover:bg-emerald-600 transition-colors ring-1 ring-white/20"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
        
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-semibold truncate">{image.id}</p>
          <p className="text-gray-400 text-xs mt-0.5">Folder {image.folder}</p>
        </div>
        
        {/* Center play/view icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="p-3 bg-emerald-500/90 backdrop-blur-sm rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagesPage() {
  const [selectedPerson, setSelectedPerson] = useState('All People');
  const [selectedCollection, setSelectedCollection] = useState('All Collections');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const imagesPerPage = 30;

  const allValidNumbers = useMemo(() => getAllValidImageNumbers(), []);

  const filteredImages = useMemo(() => {
    let images = [];
    
    if (selectedPerson !== 'All People') {
      const personImages = getPersonImages(selectedPerson);
      if (personImages) images = personImages;
    } else if (selectedCollection !== 'All Collections') {
      const collection = collections.find(c => c.name === selectedCollection);
      if (collection?.range) {
        images = getImagesRange(collection.range[0], collection.range[1]);
      }
    } else {
      const startIdx = (currentPage - 1) * imagesPerPage;
      const endIdx = startIdx + imagesPerPage;
      const numbersToShow = allValidNumbers.slice(startIdx, endIdx);
      images = numbersToShow.map(num => getImageById('EFTA' + String(num).padStart(8, '0')));
    }

    if (searchQuery) {
      images = images.filter(img => 
        img.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return images;
  }, [selectedPerson, selectedCollection, currentPage, searchQuery, allValidNumbers]);

  const paginatedImages = useMemo(() => {
    if (selectedPerson !== 'All People' || selectedCollection !== 'All Collections') {
      const startIdx = (currentPage - 1) * imagesPerPage;
      return filteredImages.slice(startIdx, startIdx + imagesPerPage);
    }
    return filteredImages;
  }, [filteredImages, currentPage, selectedPerson, selectedCollection]);

  const totalPages = useMemo(() => {
    if (selectedPerson !== 'All People') return Math.ceil(filteredImages.length / imagesPerPage);
    if (selectedCollection !== 'All Collections') return Math.ceil(filteredImages.length / imagesPerPage);
    return Math.ceil(allValidNumbers.length / imagesPerPage);
  }, [filteredImages, selectedPerson, selectedCollection, allValidNumbers]);

  const displayCount = useMemo(() => {
    if (selectedPerson !== 'All People' || selectedCollection !== 'All Collections') return filteredImages.length;
    return allValidNumbers.length;
  }, [selectedPerson, selectedCollection, filteredImages, allValidNumbers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPerson, selectedCollection]);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
    setModalImageLoaded(false);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setModalImageLoaded(false);
  }, []);

  const navigateImage = useCallback((direction) => {
    if (!selectedImage) return;
    const currentIdx = paginatedImages.findIndex(img => img.id === selectedImage.id);
    const newIdx = currentIdx + direction;
    if (newIdx >= 0 && newIdx < paginatedImages.length) {
      setModalImageLoaded(false);
      setSelectedImage(paginatedImages[newIdx]);
    }
  }, [selectedImage, paginatedImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateImage(-1);
      if (e.key === 'ArrowRight') navigateImage(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage, closeModal]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-transparent to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors group mb-6">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg ring-1 ring-emerald-500/30">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Document Archive</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Epstein Files
                <span className="text-emerald-400">.</span>
              </h1>
              <p className="text-gray-400 mt-3 text-lg">
                Browse <span className="text-white font-semibold">{totalImages.toLocaleString()}</span> document images from the DOJ release
              </p>
            </div>
            
            {/* Stats cards */}
            <div className="flex gap-4">
              <div className="px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
                <p className="text-2xl font-bold text-white">{displayCount.toLocaleString()}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Files</p>
              </div>
              <div className="px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Volumes</p>
              </div>
              <div className="px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
                <p className="text-2xl font-bold text-white">{people.length - 1}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">People</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Collection Filter */}
            <div className="relative">
              <select
                value={selectedCollection}
                onChange={(e) => {
                  setSelectedCollection(e.target.value);
                  setSelectedPerson('All People');
                }}
                className="appearance-none bg-white/5 text-white pl-4 pr-10 py-2.5 rounded-xl ring-1 ring-white/10 hover:ring-emerald-500/50 focus:ring-emerald-500 focus:outline-none transition-all cursor-pointer text-sm font-medium"
              >
                {collections.map(collection => (
                  <option key={collection.name} value={collection.name} className="bg-gray-900">
                    {collection.name}
                  </option>
                ))}
              </select>
              <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* People Filter */}
            <div className="relative">
              <select
                value={selectedPerson}
                onChange={(e) => {
                  setSelectedPerson(e.target.value);
                  setSelectedCollection('All Collections');
                }}
                className="appearance-none bg-white/5 text-white pl-4 pr-10 py-2.5 rounded-xl ring-1 ring-white/10 hover:ring-emerald-500/50 focus:ring-emerald-500 focus:outline-none transition-all cursor-pointer text-sm font-medium"
              >
                {people.map(person => (
                  <option key={person.name} value={person.name} className="bg-gray-900">
                    {person.name} ({person.count})
                  </option>
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
                placeholder="Search by EFTA ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 text-white pl-10 pr-4 py-2.5 rounded-xl ring-1 ring-white/10 placeholder-gray-500 focus:ring-emerald-500 focus:outline-none transition-all text-sm"
              />
              <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 ml-auto bg-white/5 rounded-xl p-1 ring-1 ring-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
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

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {paginatedImages.map((image, index) => (
              <ImageCard 
                key={image.id} 
                image={image} 
                onClick={handleImageClick}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {paginatedImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => handleImageClick(image)}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-xl ring-1 ring-white/10 hover:ring-emerald-500/50 cursor-pointer transition-all group"
              >
                <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <LazyImage src={image.thumbnail} alt={image.id} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{image.id}</p>
                  <p className="text-gray-500 text-sm">{image.volume} / Folder {image.folder}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); window.open(image.thumbnail, '_blank'); }}
                    className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {paginatedImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No images found</p>
            <p className="text-gray-600 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-emerald-500/50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-emerald-500/50 transition-all text-sm font-medium"
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
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
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
              className="px-4 py-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-emerald-500/50 transition-all text-sm font-medium"
            >
              Next
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2.5 bg-white/5 text-white rounded-xl ring-1 ring-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:ring-emerald-500/50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          
          {/* Close button */}
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all z-10 ring-1 ring-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
            className="absolute left-6 p-4 bg-white/10 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all ring-1 ring-white/20 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
            className="absolute right-6 p-4 bg-white/10 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all ring-1 ring-white/20 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Content */}
          <div 
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading spinner */}
            {!modalImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-gray-700 border-t-emerald-500 animate-spin" />
              </div>
            )}
            
            {/* Image */}
            <div className="relative bg-black/50 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <img
                src={selectedImage.thumbnail}
                alt={selectedImage.id}
                className={`w-full max-h-[70vh] object-contain transition-all duration-300 ${modalImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setModalImageLoaded(true)}
              />
            </div>
            
            {/* Info bar */}
            <div className="mt-4 flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl p-4 ring-1 ring-white/10">
              <div>
                <h3 className="text-white text-lg font-bold">{selectedImage.id}</h3>
                <p className="text-gray-400 text-sm">{selectedImage.volume} / Folder {selectedImage.folder}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={selectedImage.thumbnail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 transition-colors font-medium shadow-lg shadow-emerald-500/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Full Size
                </a>
                <a
                  href={selectedImage.thumbnail}
                  download={`${selectedImage.id}.jpg`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors font-medium ring-1 ring-white/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            </div>

            {/* Keyboard hint */}
            <div className="mt-3 flex justify-center gap-4 text-gray-600 text-xs">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/5 rounded text-gray-400">←</kbd>
                <kbd className="px-2 py-1 bg-white/5 rounded text-gray-400">→</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/5 rounded text-gray-400">ESC</kbd>
                Close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagesPage;
