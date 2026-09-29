import fs from 'fs';

const filePath = 'src/data/heritage.ts';
let code = fs.readFileSync(filePath, 'utf8');

// Update Interface
if (!code.includes('referenceImages?: string[];')) {
  code = code.replace(
    '  videos?: HeritageVideo[];',
    `  videos?: HeritageVideo[];
  referenceImages?: string[];
  pastVsPresent?: {
    pastImage: string;
    pastImageYear: string;
    pastImageSource: string;
    presentImage: string;
    presentImageSource: string;
    comparisonText: string;
  };`
  );
}

// Add data to Ajanta Caves
code = code.replace(
  /id: 'ajanta-caves',([\s\S]*?)recognitionKeywords: \['ajanta', 'ajintha'\],/,
  `id: 'ajanta-caves',$1recognitionKeywords: ['ajanta', 'ajintha'],
    referenceImages: ['/ajanta_slider.jpg', '/user_ajanta.jpg'],
    pastVsPresent: {
      pastImage: '/ajanta_1916.png',
      pastImageYear: '1916',
      pastImageSource: 'Archival Photograph',
      presentImage: '/ajanta_present.jpg',
      presentImageSource: 'Modern Tourist View',
      comparisonText: 'Compare how the Ajanta cave complex and surrounding landscape have changed over time. The structural integrity has been preserved, but modern pathways and lighting have been added.'
    },`
);

// Add data to Ellora Caves
code = code.replace(
  /id: 'ellora-caves',([\s\S]*?)recognitionKeywords: \['ellora', 'verul'\],/,
  `id: 'ellora-caves',$1recognitionKeywords: ['ellora', 'verul'],
    referenceImages: ['/ellora_slider.jpg'],
    pastVsPresent: {
      pastImage: '/ellora_1916.jpg',
      pastImageYear: '1916',
      pastImageSource: 'Archival Photograph',
      presentImage: '/ellora_slider.jpg',
      presentImageSource: 'Modern Tourist View',
      comparisonText: 'The magnificent Kailasa Temple has stood the test of time. Notice how the modern maintenance has cleared the surrounding vegetation while preserving the ancient rock carvings.'
    },`
);

// Add data to Raigad Fort
code = code.replace(
  /id: 'raigad-fort',([\s\S]*?)recognitionKeywords: \['raigad', 'fort'\],/,
  `id: 'raigad-fort',$1recognitionKeywords: ['raigad', 'fort'],
    referenceImages: ['/raigad_slider.png'],
    pastVsPresent: {
      pastImage: '/raigad_slider.png',
      pastImageYear: '1890s (Estimated)',
      pastImageSource: 'Archival View',
      presentImage: '/raigad_slider.png',
      presentImageSource: 'Modern View',
      comparisonText: 'The ruins of the Maratha Empire capital. While some structures have weathered, the majestic layout and strategic elevation remain imposing.'
    },`
);

// Add data to Hampi
code = code.replace(
  /id: 'hampi',([\s\S]*?)recognitionKeywords: \['hampi', 'vijayanagara'\],/,
  `id: 'hampi',$1recognitionKeywords: ['hampi', 'vijayanagara'],
    referenceImages: ['/hampi_slider.png'],
    pastVsPresent: {
      pastImage: '/hampi_slider.png',
      pastImageYear: '1856',
      pastImageSource: 'Alexander Greenlaw',
      presentImage: '/hampi_slider.png',
      presentImageSource: 'Modern View',
      comparisonText: 'The iconic stone chariot of the Vittala Temple complex. Extensive restoration work by the ASI has stabilized the structure compared to the 19th-century photographs.'
    },`
);

// Add data to Shaniwar Wada
code = code.replace(
  /id: 'shaniwar-wada',([\s\S]*?)recognitionKeywords: \['shaniwar', 'wada', 'pune'\],/,
  `id: 'shaniwar-wada',$1recognitionKeywords: ['shaniwar', 'wada', 'pune'],
    referenceImages: ['/shaniwarwada_slider.jpg'],
    pastVsPresent: {
      pastImage: '/shaniwarwada_slider.jpg',
      pastImageYear: 'Early 1900s',
      pastImageSource: 'Archival Collection',
      presentImage: '/shaniwarwada_slider.jpg',
      presentImageSource: 'Modern View',
      comparisonText: 'The imposing Delhi Darwaza remains the most iconic surviving structure of the Peshwa palace after the devastating fire of 1828.'
    },`
);

// Add data to Konark Sun Temple
code = code.replace(
  /id: 'konark-sun-temple',([\s\S]*?)recognitionKeywords: \['konark', 'sun', 'temple'\],/,
  `id: 'konark-sun-temple',$1recognitionKeywords: ['konark', 'sun', 'temple'],
    referenceImages: ['/konark_slider.jpg'],
    pastVsPresent: {
      pastImage: '/konark_slider.jpg',
      pastImageYear: '1890',
      pastImageSource: 'British Library',
      presentImage: '/konark_slider.jpg',
      presentImageSource: 'Modern View',
      comparisonText: 'The main vimana collapsed long ago, but the Jagamohana (assembly hall) was filled with sand by the British in 1903 to prevent its collapse, preserving its magnificent chariot wheels.'
    },`
);

fs.writeFileSync(filePath, code);
console.log("Updated heritage.ts");
