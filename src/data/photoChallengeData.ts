export interface PhotoSubmission {
  id: string;
  photoUrl: string;
  title: string;
  photographer: string;
  photographerAvatar?: string;
  locationId: string;
  locationName: string;
  story: string;
  votes: number;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
  isWinner?: boolean;
  prize?: string;
  competitionId: string;
  isDemo?: boolean;
}

export interface PhotoChallenge {
  id: string;
  title: string;
  theme: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'voting' | 'judging' | 'completed';
  participantsCount: number;
  submissionsCount: number;
  totalVotes: number;
  prizes: {
    first: number;
    second: number;
    third: number;
  };
}

export const activeChallenge: PhotoChallenge = {
  id: 'chal-001',
  title: 'Heritage Through Your Lens',
  theme: "India's Heritage in Your Eyes",
  description: "Visit India's cultural heritage sites, capture your best moment, and share it with the HISTONEX community.",
  startDate: '2026-09-01T00:00:00Z',
  endDate: '2026-09-30T23:59:59Z',
  status: 'active',
  participantsCount: 2438,
  submissionsCount: 4821,
  totalVotes: 18420,
  prizes: {
    first: 10000,
    second: 5000,
    third: 2500,
  }
};

export const demoSubmissions: PhotoSubmission[] = [
  {
    id: 'sub-001',
    photoUrl: '/user_ajanta.jpg',
    title: 'Ancient Light',
    photographer: 'Rahul',
    locationId: 'ajanta',
    locationName: 'Ajanta Caves',
    story: 'The morning light entering the cave created a beautiful view of the ancient architecture.',
    votes: 1284,
    dateSubmitted: '2026-09-10T08:30:00Z',
    status: 'approved',
    competitionId: 'chal-001',
    isDemo: true
  },
  {
    id: 'sub-002',
    photoUrl: '/hampi_slider.png',
    title: 'Golden Hour at Hampi',
    photographer: 'Priya',
    locationId: 'hampi',
    locationName: 'Hampi',
    story: 'The stone chariot glowing during the sunset.',
    votes: 1102,
    dateSubmitted: '2026-09-12T17:45:00Z',
    status: 'approved',
    competitionId: 'chal-001',
    isDemo: true
  },
  {
    id: 'sub-003',
    photoUrl: '/ellora_slider.jpg',
    title: 'The Stone Story',
    photographer: 'Amit',
    locationId: 'ellora',
    locationName: 'Ellora Caves',
    story: 'Intricate details of the Kailasa temple carved from a single rock.',
    votes: 982,
    dateSubmitted: '2026-09-15T10:15:00Z',
    status: 'approved',
    competitionId: 'chal-001',
    isDemo: true
  },
  {
    id: 'sub-004',
    photoUrl: '/raigad_slider.png',
    title: 'Above the Clouds',
    photographer: 'Sneha',
    locationId: 'raigad',
    locationName: 'Raigad Fort',
    story: 'A majestic view of the Maratha empire capital shrouded in mist.',
    votes: 894,
    dateSubmitted: '2026-09-18T07:20:00Z',
    status: 'approved',
    competitionId: 'chal-001',
    isDemo: true
  },
  {
    id: 'sub-005',
    photoUrl: '/ajanta_present.jpg',
    title: 'History at Sunset',
    photographer: 'Rohan',
    locationId: 'shaniwar-wada',
    locationName: 'Shaniwar Wada',
    story: 'The grand entrance of the Peshwa palace illuminated at dusk.',
    votes: 741,
    dateSubmitted: '2026-09-19T18:05:00Z',
    status: 'approved',
    competitionId: 'chal-001',
    isDemo: true
  }
];

export const previousWinners: PhotoSubmission[] = [
  {
    id: 'win-001',
    photoUrl: '/ajanta_slider.jpg',
    title: 'Golden Light at Ajanta',
    photographer: 'Rahul',
    locationId: 'ajanta',
    locationName: 'Ajanta Caves',
    story: 'Winning photograph for the September Heritage Challenge.',
    votes: 2450,
    dateSubmitted: '2026-08-15T08:00:00Z',
    status: 'approved',
    isWinner: true,
    prize: '₹10,000',
    competitionId: 'chal-prev-001',
    isDemo: true
  }
];
