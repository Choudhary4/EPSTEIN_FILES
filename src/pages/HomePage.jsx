import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import VideoRow from '../components/VideoRow'
import VideoModal from '../components/VideoModal'
import ContentSlider from '../components/ContentSlider'
import Footer from '../components/Footer'
import { videos, datasets } from '../data/videos'
import { getImagesRange, getImageById, getAllValidImageNumbers } from '../data/images'

// PDF folders data
const pdfFolders = [
  { id: 1, name: 'Legal Documents', files: 847, description: 'Court filings and legal proceedings' },
  { id: 2, name: 'Financial Records', files: 523, description: 'Bank statements and transactions' },
  { id: 3, name: 'Communications', files: 1205, description: 'Emails and correspondence' },
  { id: 4, name: 'Travel Records', files: 312, description: 'Flight logs and itineraries' },
  { id: 5, name: 'Property Documents', files: 189, description: 'Real estate and assets' },
  { id: 6, name: 'Investigation Reports', files: 445, description: 'FBI and police reports' },
  { id: 7, name: 'Witness Statements', files: 678, description: 'Depositions and testimonies' },
  { id: 8, name: 'Media Coverage', files: 234, description: 'News articles and press' },
  { id: 9, name: 'Medical Records', files: 156, description: 'Health and medical documents' },
  { id: 10, name: 'Personal Photos', files: 892, description: 'Personal photographs' },
  { id: 11, name: 'Miscellaneous', files: 420, description: 'Other documents' },
];

// Savage lines for different sections
const savageLines = {
  videos: "1,994 reasons why the powerful should be nervous.",
  images: "A picture is worth a thousand lies.",
  pdfs: "The paper trail they hoped would burn.",
};

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDataset, setSelectedDataset] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Get sample images for slider
  const sampleImages = useMemo(() => {
    const validNumbers = getAllValidImageNumbers();
    const step = Math.floor(validNumbers.length / 20);
    const samples = [];
    for (let i = 0; i < 20; i++) {
      const num = validNumbers[i * step] || validNumbers[i];
      samples.push(getImageById('EFTA' + String(num).padStart(8, '0')));
    }
    return samples;
  }, []);

  // Filter videos based on search and dataset
  const filteredVideos = useMemo(() => {
    let result = videos

    // Filter by dataset
    if (selectedDataset !== 'all') {
      result = result.filter(v => v.dataset === selectedDataset)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(v => 
        v.name.toLowerCase().includes(query) ||
        v.dataset.toLowerCase().includes(query) ||
        v.format.toLowerCase().includes(query)
      )
    }

    return result
  }, [searchQuery, selectedDataset])

  // Group videos by dataset for display
  const groupedVideos = useMemo(() => {
    const grouped = {}
    datasets.forEach(ds => {
      const dsVideos = filteredVideos.filter(v => v.dataset === ds)
      if (dsVideos.length > 0) {
        grouped[ds] = dsVideos
      }
    })
    return grouped
  }, [filteredVideos])

  const handlePlay = (video) => {
    setSelectedVideo(video)
  }

  const handleCloseModal = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDataset={selectedDataset}
        setSelectedDataset={setSelectedDataset}
        datasets={datasets}
      />
      
      <Hero onPlay={handlePlay} videos={videos} />

      {/* Featured Content Sliders */}
      <div className="pt-8 pb-4 bg-[#0a0a0a]">
        {/* Video Slider */}
        <ContentSlider
          title="📹 Surveillance Videos"
          items={videos.slice(0, 20)}
          type="video"
          link="/videos"
          linkText="1,994 Videos"
          onItemClick={handlePlay}
          accentColor="red"
          savageLine={savageLines.videos}
        />

        {/* Images Slider */}
        <ContentSlider
          title="🖼️ Document Images"
          items={sampleImages}
          type="image"
          link="/images"
          linkText="4,101 Images"
          accentColor="emerald"
          savageLine={savageLines.images}
        />

        {/* PDFs Slider */}
        <ContentSlider
          title="📄 PDF Documents"
          items={pdfFolders}
          type="pdf"
          link="/pdfs"
          linkText="11 Folders"
          accentColor="amber"
          savageLine={savageLines.pdfs}
        />
      </div>

      {/* Divider with savage quote */}
      <div className="bg-[#0a0a0a] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="border-t border-b border-gray-800 py-8">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              "The files don't care about your status."
            </p>
            <p className="text-gray-500 text-sm uppercase tracking-widest">
              Every document tells a story. Every video hides a truth.
            </p>
          </div>
        </div>
      </div>

      {/* Video Rows */}
      <div className="pt-12 pb-8 bg-[#0a0a0a]">
        {/* Search Results */}
        {searchQuery && (
          <div className="px-4 md:px-12 mb-8">
            <h2 className="text-white text-xl font-semibold mb-2">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-gray-400 text-sm">
              Found {filteredVideos.length} videos
            </p>
          </div>
        )}

        {/* Videos by Dataset */}
        {Object.entries(groupedVideos).map(([dataset, vids]) => (
          <VideoRow 
            key={dataset}
            title={dataset}
            videos={vids.slice(0, 20)} // Show only first 20 on home
            onPlay={handlePlay}
            showSeeAll={vids.length > 20}
            totalCount={vids.length}
          />
        ))}

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-white text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      <Footer />

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default HomePage
