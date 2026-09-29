export interface HeritageInformation {
  student: {
    overview: string[];
    architecture: string[];
  };
  tourist: {
    overview: string[];
    architecture: string[];
  };
  researcher: {
    overview: string[];
    architecture: string[];
  };
}

export interface HeritageVideo {
  title: string;
  youtubeId?: string;
  searchUrl?: string;
  source: string;
  type: string;
}

export interface HeritageSite {
  id: string;
  name: string;
  location: string;
  category: string;
  period: string;
  shortDescription: string;
  image: string;
  verified: boolean;
  distance?: string;
  gallery?: string[];
  historicalImages?: { year: number; image: string }[];
  coordinates?: { lat: number; lng: number };
  recognitionKeywords?: string[];
  information: HeritageInformation;
  videos?: HeritageVideo[];
  referenceImages?: string[];
  pastVsPresent?: {
    pastImage: string;
    pastImageYear: string;
    pastImageSource: string;
    presentImage: string;
    presentImageSource: string;
    comparisonText: string;
  };
}

export const demoHeritageSites: HeritageSite[] = [
  {
    id: 'ajanta-caves',
    name: 'Ajanta Caves',
    location: 'Chhatrapati Sambhajinagar, Maharashtra',
    category: 'Caves',
    period: '2nd century BCE – 6th century CE',
    shortDescription: 'Ancient rock-cut Buddhist cave monuments featuring masterpieces of Buddhist religious art.',
    image: '/ajanta_slider.jpg',
    verified: true,
    distance: '15 km',
    historicalImages: [
      { year: 1916, image: '/ajanta_1916.png' },
      { year: 2010, image: '/ajanta_2010.png' },
      { year: 2015, image: '/ajanta_2015.png' },
      { year: 2020, image: '/ajanta_2020.png' }
    ],
    gallery: [
      '/user_ajanta.jpg',
      '/ajanta_slider.jpg',
      '/ajanta_present.jpg'
    ],
    coordinates: { lat: 20.5519, lng: 75.7033 },
    recognitionKeywords: ['ajanta', 'ajintha'],
    referenceImages: ['/ajanta_slider.jpg', '/user_ajanta.jpg'],
    pastVsPresent: {
      pastImage: '/ajanta_present.jpg',
      pastImageYear: '1916',
      pastImageSource: 'Archival Photograph',
      presentImage: '/ajanta_present.jpg',
      presentImageSource: 'Modern Tourist View',
      comparisonText: 'Compare how the Ajanta cave complex and surrounding landscape have changed over time. The structural integrity has been preserved, but modern pathways and lighting have been added.'
    },
    information: {
      student: {
        overview: [
          "Imagine a time machine that takes you 2,000 years into the past! The Ajanta Caves are exactly that. They are a secret hideout carved right out of a giant rock mountain.",
          "Buddhist monks used to live, study, and pray here. They painted beautiful stories on the walls using natural colors made from rocks and plants. The coolest part? They did all of this using only tiny hand tools and sunlight bouncing off mirrors!"
        ],
        architecture: [
          "There are 30 caves in total, shaped like a giant horseshoe wrapping around a river.",
          "Some caves are 'Chaityas' (prayer halls with a stupa inside) and some are 'Viharas' (monasteries where the monks slept in small stone beds)."
        ]
      },
      tourist: {
        overview: [
          "The Ajanta Caves are a UNESCO World Heritage site and a must-visit destination in Maharashtra. Hidden in a horseshoe-shaped gorge, these 30 rock-cut caves date back to the 2nd century BCE.",
          "They are globally renowned for their incredibly preserved mural paintings that depict the Jataka tales (past lives of the Buddha). The site was abandoned and forgotten until a British officer named John Smith accidentally rediscovered them while tiger hunting in 1819!"
        ],
        architecture: [
          "Make sure to visit Cave 1 to see the famous 'Padmapani' and 'Vajrapani' paintings, which are masterpieces of Indian art.",
          "Cave 26 features a magnificent reclining Buddha statue depicting his final moments. The intricate pillars and ceilings carved out of solid basalt rock will leave you spellbound."
        ]
      },
      researcher: {
        overview: [
          "The Ajanta Caves represent the pinnacle of ancient Indian rock-cut architecture and mural painting. Constructed in two distinct phases (Satavahana period ~200 BCE, and Vakataka period ~460 CE under Emperor Harishena).",
          "The murals employ a technique where mud plaster containing cow dung, clay, and rice husks was applied to the rock, coated with lime, and painted using pigments like lapis lazuli, ochre, and soot."
        ],
        architecture: [
          "The site consists of Chaityagrihas (worship halls) and Viharas (monasteries). The Vakataka phase caves exhibit highly sophisticated architectural evolution, featuring colonnaded verandas, intricate pillared halls, and inner sanctums housing colossal Buddha images.",
          "The precise alignment of Cave 26 to capture the equinox sunrise demonstrates advanced astronomical understanding by the ancient architects."
        ]
      }
    },
    videos: [
      {
        title: "Ajanta Caves - Complete Video Guide in Hindi",
        youtubeId: "GAua9TkkRXo",
        source: "Travelpedia",
        type: "Heritage Guide"
      }
    ]
  },
  {
    id: 'ellora-caves',
    name: 'Ellora Caves',
    location: 'Chhatrapati Sambhajinagar, Maharashtra',
    category: 'Caves',
    period: '600 CE - 1000 CE',
    shortDescription: 'One of the largest rock-cut monastery-temple cave complexes in the world.',
    image: '/ellora_slider.jpg',
    verified: true,
    distance: '30 km',
    historicalImages: [
      { year: 1916, image: '/ellora_1916.jpg' },
      { year: 2010, image: '/ellora_2010.jpg' },
      { year: 2015, image: '/ellora_2015.png' },
      { year: 2020, image: '/ellora_2020.png' }
    ],
    gallery: [
      '/ellora_slider.jpg'
    ],
    coordinates: { lat: 20.0268, lng: 75.1771 },
    recognitionKeywords: ['ellora', 'verul'],
    referenceImages: ['/ellora_slider.jpg'],
    pastVsPresent: {
      pastImage: '/ellora_slider.jpg',
      pastImageYear: '1916',
      pastImageSource: 'Archival Photograph',
      presentImage: '/ellora_slider.jpg',
      presentImageSource: 'Modern Tourist View',
      comparisonText: 'The magnificent Kailasa Temple has stood the test of time. Notice how the modern maintenance has cleared the surrounding vegetation while preserving the ancient rock carvings.'
    },
    information: {
      student: {
        overview: [
          "Ellora is like a massive sculpture park where three different groups of people—Buddhists, Hindus, and Jains—built amazing temples right next to each other in perfect harmony!",
          "The most mind-blowing part is the Kailasa Temple. Instead of building it from the ground up, they carved it from the top of a mountain down to the bottom. They removed thousands of tons of rock to reveal a giant temple hiding inside!"
        ],
        architecture: [
          "There are 34 caves in total. You can see big stone elephants, flying figures, and giant gods carved straight out of the mountain.",
          "It took hundreds of years and many generations of artists to finish it all."
        ]
      },
      tourist: {
        overview: [
          "Ellora Caves is a spectacular UNESCO World Heritage site consisting of 34 monasteries and temples, extending over more than 2 km. It is a unique symbol of religious harmony in ancient India, featuring Buddhist, Hindu, and Jain monuments.",
          "Unlike Ajanta, Ellora is known primarily for its monumental sculptures rather than paintings. It is much easier to navigate and is a breathtaking display of ancient engineering."
        ],
        architecture: [
          "Cave 16, the Kailasa Temple, is the undisputed highlight. It is the largest single monolithic rock excavation in the world, carved top-down from a single volcanic basalt rock.",
          "Don't miss the Jain caves (Caves 30-34) at the northern end, which feature incredibly detailed and delicate carvings."
        ]
      },
      researcher: {
        overview: [
          "The Ellora complex was constructed between the 6th and 11th centuries CE during the Rashtrakuta and Yadava dynasties. It perfectly illustrates the spirit of tolerance characteristic of ancient India.",
          "The site comprises 12 Buddhist caves (earliest phase, 600-730 CE), 17 Hindu caves (Rashtrakuta phase, 600-870 CE), and 5 Jain caves (Digambara sect, 800-1000 CE)."
        ],
        architecture: [
          "The Kailasanatha Temple (Cave 16) represents Dravidian architecture and was commissioned by Rashtrakuta King Krishna I. The top-down excavation method required removing an estimated 200,000 tonnes of basalt rock.",
          "The structural mimicry in the rock-cut forms, including complex mandapas, vimanas, and gopurams, showcases a transitional phase in Indian temple architecture where structural building conventions were perfectly translated into monolithic subtractive rock-carving."
        ]
      }
    },
    videos: [
      {
        title: "Ellora Caves - Heritage Architecture of India",
        youtubeId: "JP4LaMary2s",
        source: "Steps Together",
        type: "Architecture"
      }
    ]
  },
  {
    id: 'raigad-fort',
    name: 'Raigad Fort',
    location: 'Raigad, Maharashtra',
    category: 'Forts',
    period: '17th Century',
    shortDescription: 'A magnificent hill fort that served as the capital of the Maratha Empire.',
    image: '/raigad_slider.png',
    verified: true,
    distance: '120 km',
    historicalImages: [
      { year: 1916, image: '/ajanta_1916.png' }
    ],
    gallery: [
      '/raigad_slider.png'
    ],
    coordinates: { lat: 18.2347, lng: 73.4464 },
    recognitionKeywords: ['raigad', 'fort'],
    referenceImages: ['/raigad_slider.png'],
    pastVsPresent: {
      pastImage: '/raigad_slider.png',
      pastImageYear: '1890s (Estimated)',
      pastImageSource: 'Archival View',
      presentImage: '/raigad_slider.png',
      presentImageSource: 'Modern View',
      comparisonText: 'The ruins of the Maratha Empire capital. While some structures have weathered, the majestic layout and strategic elevation remain imposing.'
    },
    information: {
      student: {
        overview: [
          "Raigad is a mighty fortress in the sky! It was the grand capital of Chhatrapati Shivaji Maharaj, the great warrior king.",
          "To get to the top in the old days, you had to climb over 1,700 steep steps. It was so high and surrounded by deep valleys that enemies could almost never attack it."
        ],
        architecture: [
          "The fort has a special 'Maha Darwaja' (Great Door) that was built to stop charging elephants.",
          "It also has the King's throne room, where you can whisper at one end and hear it perfectly at the other end!"
        ]
      },
      tourist: {
        overview: [
          "Rising 820 meters above sea level, Raigad Fort is a symbol of Maratha pride. It was crowned the capital of the Maratha Empire by Chhatrapati Shivaji Maharaj in 1674.",
          "Today, you can reach the top via the Raigad Ropeway in just a few minutes, offering stunning panoramic views of the Sahyadri mountains."
        ],
        architecture: [
          "Key highlights include the King's Durbar (Throne Room), the Queen's quarters with individual chambers, and the Takmak Tok—a dramatic cliff edge.",
          "The fort is a marvel of defensive architecture. The Maha Darwaja is flanked by massive bastions designed to be invisible to approaching enemies until they are right at the gates."
        ]
      },
      researcher: {
        overview: [
          "Originally known as Rairi, the fort was captured by Chhatrapati Shivaji Maharaj in 1656 from the Moreys of Javli. It was massively expanded and heavily fortified by the chief architect, Hiroji Indulkar.",
          "The fort functioned as a highly organized administrative capital until it was captured by the Mughals in 1689, and later looted by the British in 1818."
        ],
        architecture: [
          "Raigad exemplifies prime Maratha hill fort architecture. The acoustic engineering in the Durbar is particularly notable, designed so the King could hear murmurs from the entrance.",
          "The structural planning includes advanced water harvesting systems like the Ganga Sagar lake, ensuring the garrison could withstand prolonged sieges without external water supply."
        ]
      }
    },
    videos: [
      {
        title: "The Spirit of Raigad",
        youtubeId: "j1CS3--Y3Yw",
        source: "Maharashtra Tourism",
        type: "History"
      }
    ]
  },
  {
    id: 'hampi',
    name: 'Hampi',
    location: 'Vijayanagara, Karnataka',
    category: 'Archaeological Sites',
    period: '14th Century',
    shortDescription: 'Ruins of the magnificent capital city of the Vijayanagara Empire.',
    image: '/hampi_slider.png',
    verified: true,
    distance: '350 km',
    historicalImages: [
      { year: 1856, image: '/hampi_1856.jpg' },
      { year: 1900, image: '/hampi_1900.jpg' },
      { year: 1950, image: '/hampi_1950.jpg' },
      { year: 2000, image: '/hampi_2000.jpg' }
    ],
    gallery: [
      '/hampi_slider.png'
    ],
    coordinates: { lat: 15.3350, lng: 76.4600 },
    recognitionKeywords: ['hampi', 'vijayanagara'],
    referenceImages: ['/hampi_slider.png', '/hampi_2000.jpg', '/hampi_1950.jpg', '/hampi_1900.jpg', '/hampi_1856.jpg'],
    pastVsPresent: {
      pastImage: '/hampi_slider.png',
      pastImageYear: '1856',
      pastImageSource: 'Alexander Greenlaw',
      presentImage: '/hampi_slider.png',
      presentImageSource: 'Modern View',
      comparisonText: 'The iconic stone chariot of the Vittala Temple complex. Extensive restoration work by the ASI has stabilized the structure compared to the 19th-century photographs.'
    },
    information: {
      student: {
        overview: [
          "Hampi is like a massive puzzle of giant boulders and ruined palaces. Hundreds of years ago, it was one of the richest and biggest cities in the whole world!",
          "People used to trade diamonds and gold right on the streets. Today, it looks like a magical stone kingdom from a fantasy movie."
        ],
        architecture: [
          "There is a famous Stone Chariot that looks like it has real wheels that can spin.",
          "There are also 'musical pillars' in one temple—if you tap them gently, they make sounds like different musical instruments!"
        ]
      },
      tourist: {
        overview: [
          "Hampi, the former capital of the Vijayanagara Empire, is a mesmerizing UNESCO World Heritage site dotted with ancient temple ruins, monolithic sculptures, and surreal boulder-strewn landscapes.",
          "It's a photographer's paradise. Rent a bicycle or a moped to explore the vast area, stretching across the banks of the Tungabhadra River."
        ],
        architecture: [
          "The Vittala Temple complex is the crown jewel, famous for the iconic Stone Chariot and the incredible musical pillars.",
          "Don't miss the Virupaksha Temple, which is still active today, and the grand Elephant Stables, a beautifully symmetric domed structure."
        ]
      },
      researcher: {
        overview: [
          "Hampi was the prosperous capital of the Vijayanagara Empire (1336–1565 CE). According to Persian and European travelers like Abdur Razzak and Domingo Paes, it was the second-largest medieval-era city after Beijing.",
          "The empire fell after the Battle of Talikota in 1565, when a coalition of Deccan Sultanates conquered and systematically destroyed the city over six months."
        ],
        architecture: [
          "Hampi architecture represents a distinct Vijayanagara style—a synthesis of Chola, Pandya, and Chalukya aesthetics. It prominently features intricately carved pillared mandapas and towering gopurams.",
          "The Indo-Islamic influence is highly visible in secular structures like the Lotus Mahal and the Elephant Stables, demonstrating the empire's cosmopolitan architectural integration."
        ]
      }
    },
    videos: [
      {
        title: "Hampi Heritage Videos",
        searchUrl: "https://www.youtube.com/results?search_query=Hampi+heritage+history+tourism",
        source: "YouTube Search",
        type: "Virtual Tour"
      }
    ]
  },
  {
    id: 'shaniwar-wada',
    name: 'Shaniwar Wada',
    location: 'Pune, Maharashtra',
    category: 'Monuments',
    period: '18th Century',
    shortDescription: 'Historical fortification built by the Peshwas of the Maratha Empire.',
    image: '/shaniwarwada_slider.jpg',
    verified: true,
    distance: '45 km',
    coordinates: { lat: 18.5195, lng: 73.8553 },
    recognitionKeywords: ['shaniwar', 'wada', 'pune'],
    referenceImages: ['/shaniwarwada_slider.jpg'],
    pastVsPresent: {
      pastImage: '/shaniwarwada_slider.jpg',
      pastImageYear: 'Early 1900s',
      pastImageSource: 'Archival Collection',
      presentImage: '/shaniwarwada_slider.jpg',
      presentImageSource: 'Modern View',
      comparisonText: 'The imposing Delhi Darwaza remains the most iconic surviving structure of the Peshwa palace after the devastating fire of 1828.'
    },
    information: {
      student: {
        overview: [
          "Shaniwar Wada was the grand, 7-story palace of the Peshwas, the Prime Ministers of the Maratha Empire.",
          "A massive fire burned down most of the palace over 200 years ago, but the giant stone walls and heavy iron-spiked doors are still standing today."
        ],
        architecture: [
          "The main gate has huge iron spikes meant to stop enemy elephants from smashing it down.",
          "Inside, there used to be beautiful gardens and a fountain shaped like a lotus flower with a thousand jets of water!"
        ]
      },
      tourist: {
        overview: [
          "Located in the heart of Pune, Shaniwar Wada is the historic seat of the Peshwa rulers. Built in 1732, it was the center of Indian politics in the 18th century.",
          "While the main palace was destroyed by an unexplained fire in 1828, the imposing fortification walls and impressive gateways remain intact. It's a great spot to experience Pune's history."
        ],
        architecture: [
          "The Dilli Darwaza (Delhi Gate) is the massive main entrance, heavily reinforced to prevent elephant charges.",
          "Inside, you can walk among the foundations of the old halls and see the Hazari Karanje (Fountain of a Thousand Jets), which was an engineering marvel of its time."
        ]
      },
      researcher: {
        overview: [
          "Commissioned by Peshwa Baji Rao I, the construction of Shaniwar Wada laid the foundation for Pune's transformation into a major political capital. The building served as the de facto seat of the Maratha Empire until 1818.",
          "The complex was a seven-storied structure (the uppermost floor being the 'Meghadambari'), symbolizing the zenith of Peshwa authority before its capture by the British East India Company."
        ],
        architecture: [
          "The architecture reflects a blend of Maratha military engineering and Mughal aesthetics, featuring ornate teakwood carving and extensive use of local basalt rock.",
          "The intricate drainage and water supply system, bringing water from the Katraj lake via underground aqueducts, demonstrates sophisticated 18th-century urban engineering."
        ]
      }
    },
    videos: [
      {
        title: "Virtual Tour of Shaniwar Wada",
        youtubeId: "Fs1MYTyUhYA",
        source: "Maharashtra Tourism",
        type: "Virtual Tour"
      }
    ]
  },
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    location: 'Odisha, India',
    category: 'Temple',
    period: '13th Century',
    shortDescription: 'A 13th-century Sun Temple designed as a massive chariot with immense stone wheels and pillars.',
    image: '/konark_slider.jpg',
    verified: true,
    coordinates: { lat: 19.8876, lng: 86.0945 },
    recognitionKeywords: ['konark', 'sun', 'temple'],
    referenceImages: ['/konark_slider.jpg'],
    pastVsPresent: {
      pastImage: '/konark_slider.jpg',
      pastImageYear: '1890',
      pastImageSource: 'British Library',
      presentImage: '/konark_slider.jpg',
      presentImageSource: 'Modern View',
      comparisonText: 'The main vimana collapsed long ago, but the Jagamohana (assembly hall) was filled with sand by the British in 1903 to prevent its collapse, preserving its magnificent chariot wheels.'
    },
    information: {
      student: {
        overview: [
          "The Konark Temple is shaped like a giant, stone chariot carrying the Sun God across the sky!",
          "It has 24 massive stone wheels and is pulled by 7 giant stone horses. It is so big and cool that it is printed on the back of the Indian 10-rupee note."
        ],
        architecture: [
          "The giant stone wheels actually work as sundials! You can look at the shadows they cast to tell exactly what time it is.",
          "Hundreds of years ago, a giant magnet was said to be on top of the temple that made the main statue float in mid-air!"
        ]
      },
      tourist: {
        overview: [
          "The Konark Sun Temple is a 13th-century masterpiece and a UNESCO World Heritage site. It was built by King Narasimhadeva I on the shores of the Bay of Bengal.",
          "Known as the 'Black Pagoda' by European sailors, the temple is an architectural wonder dedicated to Surya, the Sun God."
        ],
        architecture: [
          "The entire temple is designed as a colossal chariot with 24 intricately carved wheels and 7 horses.",
          "The main tower (Vimana) collapsed long ago, but the Jagamohana (audience hall) survives and is completely filled with sand by the British to prevent it from collapsing. The detailed carvings covering every inch of the stone are breathtaking."
        ]
      },
      researcher: {
        overview: [
          "Constructed around 1250 CE by the Eastern Ganga dynasty, Konark represents the climax of Kalinga temple architecture.",
          "Historical records indicate that the main Vimana originally reached a height of 227 feet, making it one of the tallest temples in India before its collapse (likely due to structural faults, soil subsidence, or desecration)."
        ],
        architecture: [
          "The temple complex follows the classic Kalinga style consisting of a Deula (sanctum), Jagamohana (porch), and Natamandira (dance hall).",
          "The structural integrity heavily relied on iron cramps to hold massive Khondalite and laterite stone blocks together. The 24 wheels are not just decorative but precise astronomical instruments (sundials) capable of calculating time to the exact minute."
        ]
      }
    },
    videos: [
      {
        title: "Konark - The Only Sun Temple, Odisha",
        youtubeId: "ruqZJSXLkg0",
        source: "Indian Tourism",
        type: "Culture"
      }
    ]
  }
];
