// Script to generate images.js data file
// Run with: node scripts/generateImages.js

import fs from 'fs';

// Base URL for images
const WORKER_URL = 'https://epstein-files.rhys-669.workers.dev';

// Image ranges based on the website structure
// Total: 4101 files across multiple volumes
const imageRanges = [
  // VOL00001/IMAGES/0001 - EFTA00000001 to EFTA00001000
  { vol: 'VOL00001', folder: '0001', start: 1, end: 1000 },
  // VOL00001/IMAGES/0002 - EFTA00001001 to EFTA00002000
  { vol: 'VOL00001', folder: '0002', start: 1001, end: 2000 },
  // VOL00001/IMAGES/0003 - EFTA00002001 to EFTA00003000
  { vol: 'VOL00001', folder: '0003', start: 2001, end: 3057 },
  // VOL00001/IMAGES/0004
  { vol: 'VOL00001', folder: '0004', start: 3055, end: 3058 },
  // VOL00002/IMAGES/0001
  { vol: 'VOL00002', folder: '0001', start: 3413, end: 3820 },
  // VOL00003/IMAGES/0001
  { vol: 'VOL00003', folder: '0001', start: 3861, end: 5561 },
  // VOL00004/IMAGES/0001
  { vol: 'VOL00004', folder: '0001', start: 5716, end: 8220 },
  // VOL00005/IMAGES/0001
  { vol: 'VOL00005', folder: '0001', start: 8423, end: 8600 },
  // VOL00006/IMAGES/0001
  { vol: 'VOL00006', folder: '0001', start: 8716, end: 9500 },
  // VOL00007/IMAGES/0001
  { vol: 'VOL00007', folder: '0001', start: 9586, end: 9664 },
];

// Key people data (high confidence appearances)
const peopleData = [
  { name: 'Jeffrey Epstein', count: 275 },
  { name: 'Ghislaine Maxwell', count: 90 },
  { name: 'Bill Clinton', count: 25 },
  { name: 'Walter Cronkite', count: 9 },
  { name: 'Chris Tucker', count: 6 },
  { name: 'William Daniel Hillis', count: 5 },
  { name: 'David Copperfield', count: 3 },
  { name: 'Richard Branson', count: 2 },
  { name: 'Donald Trump', count: 2 },
  { name: 'Prince Andrew', count: 2 },
  { name: 'Albert Einstein', count: 1 },
  { name: 'Diana Ross', count: 1 },
  { name: 'Mick Jagger', count: 4 },
];

// Generate all image IDs from 1 to 9664 (the max we saw)
function generateAllImages() {
  const images = [];
  
  // Generate sequential images (the website has EFTA00000001 to EFTA00009664)
  // But not all numbers exist, so we'll create a comprehensive list
  for (let i = 1; i <= 9664; i++) {
    const id = String(i).padStart(8, '0');
    const efta = `EFTA${id}`;
    
    // Determine volume and folder based on ID ranges
    let vol, folder;
    if (i <= 1000) {
      vol = 'VOL00001';
      folder = '0001';
    } else if (i <= 2000) {
      vol = 'VOL00001';
      folder = '0002';
    } else if (i <= 3057) {
      vol = 'VOL00001';
      folder = '0003';
    } else if (i <= 3412) {
      vol = 'VOL00001';
      folder = '0004';
    } else if (i <= 3820) {
      vol = 'VOL00002';
      folder = '0001';
    } else if (i <= 5715) {
      vol = 'VOL00003';
      folder = '0001';
    } else if (i <= 8422) {
      vol = 'VOL00004';
      folder = '0001';
    } else if (i <= 8715) {
      vol = 'VOL00005';
      folder = '0001';
    } else if (i <= 9585) {
      vol = 'VOL00006';
      folder = '0001';
    } else {
      vol = 'VOL00007';
      folder = '0001';
    }
    
    images.push({
      id: efta,
      thumbnail: `${WORKER_URL}/thumbnails/${vol}/IMAGES/${folder}/${efta}.jpg`,
      fullImage: `${WORKER_URL}/pdfs-as-jpegs/${vol}/IMAGES/${folder}/${efta}/page-001.jpg`,
      volume: vol,
      folder: folder,
      number: i
    });
  }
  
  return images;
}

// Write the output file
const images = generateAllImages();

const output = `// Auto-generated images data for Epstein Files
// Total: ${images.length} images

export const WORKER_URL = '${WORKER_URL}';

// Key people for filtering
export const people = ${JSON.stringify(peopleData, null, 2)};

// All images
export const images = ${JSON.stringify(images.slice(0, 100), null, 2)};

// Get more images (lazy load to keep file size manageable)
export function getImageById(id) {
  const num = parseInt(id.replace('EFTA', ''));
  const paddedId = 'EFTA' + String(num).padStart(8, '0');
  
  let vol, folder;
  if (num <= 1000) {
    vol = 'VOL00001'; folder = '0001';
  } else if (num <= 2000) {
    vol = 'VOL00001'; folder = '0002';
  } else if (num <= 3057) {
    vol = 'VOL00001'; folder = '0003';
  } else if (num <= 3412) {
    vol = 'VOL00001'; folder = '0004';
  } else if (num <= 3820) {
    vol = 'VOL00002'; folder = '0001';
  } else if (num <= 5715) {
    vol = 'VOL00003'; folder = '0001';
  } else if (num <= 8422) {
    vol = 'VOL00004'; folder = '0001';
  } else if (num <= 8715) {
    vol = 'VOL00005'; folder = '0001';
  } else if (num <= 9585) {
    vol = 'VOL00006'; folder = '0001';
  } else {
    vol = 'VOL00007'; folder = '0001';
  }
  
  return {
    id: paddedId,
    thumbnail: \`\${WORKER_URL}/thumbnails/\${vol}/IMAGES/\${folder}/\${paddedId}.jpg\`,
    fullImage: \`\${WORKER_URL}/pdfs-as-jpegs/\${vol}/IMAGES/\${folder}/\${paddedId}/page-001.jpg\`,
    volume: vol,
    folder: folder,
    number: num
  };
}

// Generate image range for pagination
export function getImagesRange(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(getImageById('EFTA' + String(i).padStart(8, '0')));
  }
  return result;
}

// Total image count
export const totalImages = 4101;

// Volume info
export const volumes = [
  { name: 'VOL00001', folders: ['0001', '0002', '0003', '0004'], imageCount: 3057 },
  { name: 'VOL00002', folders: ['0001'], imageCount: 408 },
  { name: 'VOL00003', folders: ['0001'], imageCount: 1854 },
  { name: 'VOL00004', folders: ['0001'], imageCount: 2707 },
  { name: 'VOL00005', folders: ['0001'], imageCount: 177 },
  { name: 'VOL00006', folders: ['0001'], imageCount: 870 },
  { name: 'VOL00007', folders: ['0001'], imageCount: 79 },
];
`;

console.log('Generated images data');
console.log(output.slice(0, 2000) + '...');
