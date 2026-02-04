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

// PDF folders data with real links
const pdfFolders = [
  { id: 1, name: 'Folder 0001', files: 'Batch 1', link: 'https://drive.google.com/drive/folders/1WEbAIwUCDR1Lv5bMQmasmnBYYYZC0imT' },
  { id: 2, name: 'Folder 0002', files: 'Batch 2', link: 'https://drive.google.com/drive/folders/1hAsbwxLT8CyMoWSwEdfq3n4k8Q1ltzgq' },
  { id: 3, name: 'Folder 0003', files: 'Batch 3', link: 'https://drive.google.com/drive/folders/1Tf6CnXM70_F6ABIkrEg_JykXsCURSyGd' },
  { id: 4, name: 'Folder 0004', files: 'Batch 4', link: 'https://drive.google.com/drive/folders/1lk5j9Hhhri--90uadIzlZF5h2269WXtP' },
  { id: 5, name: 'Folder 0005', files: 'Batch 5', link: 'https://drive.google.com/drive/folders/1zOgDN2hrD_XIoL--Qez1lMibXyymlrIn' },
  { id: 6, name: 'Folder 0006', files: 'Batch 6', link: 'https://drive.google.com/drive/folders/1Qfa8-Q2Yhk_wnW7oUnSrJhWHBCNZVGCE' },
  { id: 7, name: 'Folder 0007', files: 'Batch 7', link: 'https://drive.google.com/drive/folders/1NQ7cf-wQcv-KW09f0mSVIgm-1kEK4SqJ' },
  { id: 8, name: 'Folder 0008', files: 'Batch 8', link: 'https://drive.google.com/drive/folders/1YqowKHcvoYWoNmHFSdjXiqEAh-vBCV-r' },
  { id: 9, name: 'Folder 0009', files: 'Batch 9', link: 'https://drive.google.com/drive/folders/19tlDDBKXSjXpfTJxWhyCcF1wper71Nhx' },
  { id: 10, name: 'Folder 0010', files: 'Batch 10', link: 'https://drive.google.com/drive/folders/1pNz1VLW0BuU15Ifvh-NRjXB9DgR0JGJA' },
  { id: 11, name: 'Folder 0011', files: 'Batch 11', link: 'https://drive.google.com/drive/folders/1sBsLI_pO1RP2qJH9aLY73dwOWTg0UMo4' },
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
