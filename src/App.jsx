import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DatasetPage from './pages/DatasetPage'
import PDFsPage from './pages/PDFsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dataset/:datasetId" element={<DatasetPage />} />
        <Route path="/pdfs" element={<PDFsPage />} />
      </Routes>
    </Router>
  )
}

export default App
