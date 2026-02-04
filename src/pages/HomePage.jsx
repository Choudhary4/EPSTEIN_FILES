import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import VideoRow from '../components/VideoRow'
import VideoModal from '../components/VideoModal'
import Footer from '../components/Footer'
import { videos, datasets } from '../data/videos'

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDataset, setSelectedDataset] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)

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
