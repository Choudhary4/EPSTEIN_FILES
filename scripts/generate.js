import fs from 'fs';

const rawData = fs.readFileSync('/tmp/videos.txt', 'utf8');
const urls = rawData.trim().split('\n').filter(url => url.trim());

const videos = urls.map((url, index) => {
  const urlDecoded = decodeURIComponent(url);
  const parts = urlDecoded.split('/');
  const filename = parts[parts.length - 1];
  const name = filename.split('.')[0];
  const format = filename.split('.').pop().toUpperCase();
  const datasetMatch = urlDecoded.match(/DataSet\s*(\d+)/i);
  const dataset = datasetMatch ? 'DataSet ' + datasetMatch[1] : 'Unknown';
  return { id: index + 1, name, url: url.trim(), dataset, format };
});

const groupedByDataset = {};
videos.forEach(v => {
  if (!groupedByDataset[v.dataset]) groupedByDataset[v.dataset] = [];
  groupedByDataset[v.dataset].push(v);
});

const datasets = Object.keys(groupedByDataset).sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)?.[0] || '0');
  const numB = parseInt(b.match(/\d+/)?.[0] || '0');
  return numA - numB;
});

const output = `// Auto-generated video data from DOJ Epstein Files
// Total: ${videos.length} videos

export const videos = ${JSON.stringify(videos, null, 2)};

export const videosByDataset = ${JSON.stringify(groupedByDataset, null, 2)};

export const datasets = ${JSON.stringify(datasets, null, 2)};
`;

fs.writeFileSync('./src/data/videos.js', output);
console.log('Generated videos.js with ' + videos.length + ' videos');
console.log('Datasets found:', datasets);
