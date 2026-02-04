// Epstein Files - Images Data
// Total: 4101 images from DOJ release

export const WORKER_URL = 'https://epstein-files.rhys-669.workers.dev';

// Key people for filtering (with image appearance counts)
export const people = [
  { name: 'All People', count: 4101 },
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
  { name: 'Ted Waitt', count: 5 },
  { name: 'Robert Trivers', count: 3 },
  { name: 'John Brockman', count: 5 },
  { name: 'Mick Jagger', count: 4 },
  { name: 'Albert Einstein', count: 1 },
  { name: 'Diana Ross', count: 1 },
  { name: 'Brett Ratner', count: 1 },
];

// People's image file mappings (high confidence > 90%)
export const peopleImages = {
  'Jeffrey Epstein': [
    'EFTA00003324', 'EFTA00003420', 'EFTA00003758', 'EFTA00003660', 'EFTA00003636',
    'EFTA00003716', 'EFTA00003661', 'EFTA00003759', 'EFTA00003749', 'EFTA00003547',
    'EFTA00003772', 'EFTA00003664', 'EFTA00003434', 'EFTA00003583', 'EFTA00003548',
    'EFTA00003549', 'EFTA00003553', 'EFTA00003630', 'EFTA00003631', 'EFTA00003632',
    'EFTA00003633', 'EFTA00003634', 'EFTA00003635', 'EFTA00003637', 'EFTA00003638',
    'EFTA00003639', 'EFTA00003640', 'EFTA00003641', 'EFTA00003656', 'EFTA00003657',
    'EFTA00003658', 'EFTA00003659', 'EFTA00003662', 'EFTA00003663', 'EFTA00003665',
    'EFTA00003666', 'EFTA00003667', 'EFTA00003668', 'EFTA00003669', 'EFTA00003670',
    'EFTA00003671', 'EFTA00003672', 'EFTA00003673', 'EFTA00003674', 'EFTA00003675',
    'EFTA00003676', 'EFTA00003677', 'EFTA00003678', 'EFTA00003679', 'EFTA00003680',
  ],
  'Ghislaine Maxwell': [
    'EFTA00003162', 'EFTA00003163', 'EFTA00003164', 'EFTA00003165', 'EFTA00003166',
    'EFTA00003167', 'EFTA00003168', 'EFTA00003169', 'EFTA00003170', 'EFTA00003171',
    'EFTA00003172', 'EFTA00003173', 'EFTA00003174', 'EFTA00003175', 'EFTA00003176',
    'EFTA00003177', 'EFTA00003178', 'EFTA00003179', 'EFTA00003180', 'EFTA00003181',
  ],
  'Bill Clinton': [
    'EFTA00003517', 'EFTA00003518', 'EFTA00003519', 'EFTA00003520', 'EFTA00003521',
    'EFTA00003522', 'EFTA00003523', 'EFTA00003524', 'EFTA00003525', 'EFTA00003526',
    'EFTA00003527', 'EFTA00003528', 'EFTA00003529', 'EFTA00003530', 'EFTA00003531',
  ],
  'Walter Cronkite': [
    'EFTA00003642', 'EFTA00003643', 'EFTA00003644', 'EFTA00003645', 'EFTA00003646',
    'EFTA00003647', 'EFTA00003648', 'EFTA00003649', 'EFTA00003650',
  ],
  'David Copperfield': [
    'EFTA00003817', 'EFTA00003818', 'EFTA00003819',
  ],
  'Richard Branson': [
    'EFTA00003540', 'EFTA00000515',
  ],
  'Ted Waitt': [
    'EFTA00003382', 'EFTA00003383', 'EFTA00003816',
  ],
  'Mick Jagger': [
    'EFTA00003276',
  ],
};

// Helper to determine volume and folder from image number
function getVolumeFolder(num) {
  // Volume 1 - folders 0001-0004
  if (num >= 1 && num <= 1000) return { vol: 'VOL00001', folder: '0001' };
  if (num >= 1001 && num <= 2000) return { vol: 'VOL00001', folder: '0002' };
  if (num >= 2001 && num <= 3000) return { vol: 'VOL00001', folder: '0003' };
  if (num >= 3001 && num <= 3057) return { vol: 'VOL00001', folder: '0004' };
  // Volume 2
  if (num >= 3058 && num <= 3860) return { vol: 'VOL00002', folder: '0001' };
  // Volume 3
  if (num >= 3861 && num <= 5715) return { vol: 'VOL00003', folder: '0001' };
  // Volume 4
  if (num >= 5716 && num <= 8422) return { vol: 'VOL00004', folder: '0001' };
  // Volume 5
  if (num >= 8423 && num <= 8715) return { vol: 'VOL00005', folder: '0001' };
  // Volume 6
  if (num >= 8716 && num <= 9585) return { vol: 'VOL00006', folder: '0001' };
  // Volume 7
  return { vol: 'VOL00007', folder: '0001' };
}

// Get image data by ID
export function getImageById(id) {
  const num = parseInt(id.replace('EFTA', ''));
  const paddedId = 'EFTA' + String(num).padStart(8, '0');
  const { vol, folder } = getVolumeFolder(num);
  
  return {
    id: paddedId,
    thumbnail: `${WORKER_URL}/thumbnails/${vol}/IMAGES/${folder}/${paddedId}.jpg`,
    fullImage: `${WORKER_URL}/pdfs-as-jpegs/${vol}/IMAGES/${folder}/${paddedId}/page-001.jpg`,
    volume: vol,
    folder: folder,
    number: num
  };
}

// Generate image range for pagination
export function getImagesRange(start, end) {
  const result = [];
  for (let i = start; i <= Math.min(end, 9664); i++) {
    result.push(getImageById('EFTA' + String(i).padStart(8, '0')));
  }
  return result;
}

// Get images for a specific person
export function getPersonImages(personName) {
  if (personName === 'All People' || !peopleImages[personName]) {
    return null; // Return null to indicate "show all"
  }
  return peopleImages[personName].map(id => getImageById(id));
}

// Total image count
export const totalImages = 4101;

// Volume info
export const volumes = [
  { name: 'VOL00001', description: 'Volume 1 - Images', imageRange: [1, 3057] },
  { name: 'VOL00002', description: 'Volume 2 - Images', imageRange: [3413, 3820] },
  { name: 'VOL00003', description: 'Volume 3 - Images', imageRange: [3861, 5715] },
  { name: 'VOL00004', description: 'Volume 4 - Images', imageRange: [5716, 8422] },
  { name: 'VOL00005', description: 'Volume 5 - Images', imageRange: [8423, 8715] },
  { name: 'VOL00006', description: 'Volume 6 - Images', imageRange: [8716, 9585] },
  { name: 'VOL00007', description: 'Volume 7 - Images', imageRange: [9586, 9664] },
];

// Collections/Categories
export const collections = [
  { name: 'All Collections', count: 4101 },
  { name: 'Volume 1', count: 3057, range: [1, 3057] },
  { name: 'Volume 2', count: 803, range: [3058, 3860] },
  { name: 'Volume 3', count: 1855, range: [3861, 5715] },
  { name: 'Volume 4', count: 2707, range: [5716, 8422] },
  { name: 'Volume 5', count: 293, range: [8423, 8715] },
  { name: 'Volume 6', count: 870, range: [8716, 9585] },
  { name: 'Volume 7', count: 79, range: [9586, 9664] },
];

// Valid image ranges (continuous ranges that exist)
export const validRanges = [
  [1, 3057],     // Volume 1 (folders 0001-0004)
  [3058, 3860],  // Volume 2 (folder 0001)
  [3861, 5715],  // Volume 3 (folder 0001)
  [5716, 8422],  // Volume 4 (folder 0001)
  [8423, 8715],  // Volume 5 (folder 0001)
  [8716, 9585],  // Volume 6 (folder 0001)
  [9586, 9664],  // Volume 7 (folder 0001)
];

// Check if image number is valid
export function isValidImageNumber(num) {
  return validRanges.some(([start, end]) => num >= start && num <= end);
}

// Get all valid image numbers
export function getAllValidImageNumbers() {
  const numbers = [];
  for (const [start, end] of validRanges) {
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
  }
  return numbers;
}
