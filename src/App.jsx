import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DatasetPage from './pages/DatasetPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dataset/:datasetId" element={<DatasetPage />} />
      </Routes>
    </Router>
  )
}

export default App
