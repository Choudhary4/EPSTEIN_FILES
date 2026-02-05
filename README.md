# EPSTEIN FILES 📁

A Netflix-style web application for browsing the Epstein Files released by the U.S. Department of Justice. Built with React, Vite, and Tailwind CSS.

![Epstein Files](https://img.shields.io/badge/Files-6%2C106-red)
![Videos](https://img.shields.io/badge/Videos-1%2C994-blue)
![Images](https://img.shields.io/badge/Images-4%2C101-green)
![PDFs](https://img.shields.io/badge/PDF%20Folders-11-orange)

## 🔗 Live Demo

**[View Live Site](https://epstein-files.vercel.app)**

## 📊 Data Overview

| Category | Count | Source |
|----------|-------|--------|
| Videos | 1,994 | DOJ Datasets 10-14 |
| Images | 4,101 | 7 Volumes (VOL00001-VOL00007) |
| PDF Folders | 11 | Google Drive |

## ✨ Features

- **🎬 Video Browser** - Browse 1,994 surveillance and evidence videos with custom thumbnails
- **🖼️ Image Gallery** - View 4,101 images with lazy loading and modal viewer
- **📄 PDF Documents** - Access 11 Google Drive folders with official documents
- **🔍 Search & Filter** - Search across all content with dataset filtering
- **📱 Fully Responsive** - Works on desktop, tablet, and mobile
- **🎨 Netflix-Style UI** - Dark theme with content sliders and smooth animations
- **⚡ Fast Performance** - Optimized with IntersectionObserver for lazy loading

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM
- **Deployment:** Vercel
- **API:** Cloudflare Workers (for image serving)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Choudhary4/EPSTEIN_FILES.git

# Navigate to project directory
cd EPSTEIN_FILES

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Responsive navigation with mobile menu
│   ├── Hero.jsx         # Landing hero section with rotating quotes
│   ├── ContentSlider.jsx # Netflix-style horizontal sliders
│   ├── VideoCard.jsx    # Video card component
│   ├── VideoModal.jsx   # Video player modal
│   ├── VideoRow.jsx     # Video row layout
│   └── Footer.jsx       # Site footer with links
├── pages/
│   ├── HomePage.jsx     # Main landing page with sliders
│   ├── VideosPage.jsx   # Dedicated video browsing
│   ├── ImagesPage.jsx   # Image gallery with filters
│   ├── PDFsPage.jsx     # PDF folders with Drive links
│   └── DatasetPage.jsx  # Dataset-specific view
├── data/
│   ├── videos.js        # Video metadata (1,994 entries)
│   └── images.js        # Image metadata (4,101 entries)
└── App.jsx              # Main app with routing
```

## 📡 Data Sources

- **Official DOJ Page:** [justice.gov/epstein](https://www.justice.gov/epstein)
- **DOJ Press Release:** [Justice Department Releases Epstein Documents](https://www.justice.gov/usao-sdny/pr/justice-department-releases-epstein-documents)

## 🤝 Connect

- **GitHub:** [@Choudhary4](https://github.com/Choudhary4)
- **Instagram:** [@kuntal_16_2_8](https://instagram.com/kuntal_16_2_8)

## ⚠️ Disclaimer

This is an **unofficial viewer** for publicly released documents. All video files, images, and documents are sourced directly from the U.S. Department of Justice. This project is built for public transparency and educational purposes.

## 📝 License

MIT License - feel free to use this project for your own purposes.

---

**Built for public transparency** 🔍
