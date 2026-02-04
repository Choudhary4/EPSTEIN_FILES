import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DatasetPage from './pages/DatasetPage'
import PDFsPage from './pages/PDFsPage'
import ImagesPage from './pages/ImagesPage'
import VideosPage from './pages/VideosPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/dataset/:datasetId" element={<DatasetPage />} />
        <Route path="/pdfs" element={<PDFsPage />} />
        <Route path="/images" element={<ImagesPage />} />
      </Routes>
    </Router>
  )
}

export default App
