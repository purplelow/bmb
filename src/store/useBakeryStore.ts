import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  nameKo: string;
  price: number;
  image: string;
  isNew?: boolean;
  isBest?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  images?: string[];
}

export interface Bakery {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  shortDesc: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location: string;
  address: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  phone: string;
  website: string;
  priceRange: '₩' | '₩₩' | '₩₩₩';
  menu: MenuItem[];
  reviews: Review[];
  waitTime?: number;
  distance?: string;
}

interface BakeryState {
  bakeries: Bakery[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  toggleFavorite: (id: string) => void;
}

export const CATEGORIES = ['전체', '크루아상', '소금빵', '케이크', '도넛', '식빵', '베이글'];

const MOCK_BAKERIES: Bakery[] = [
  {
    id: '1',
    name: 'Le Petit Croissant',
    nameKo: '르 쁘띠 크루아상',
    description: '파리에서 직접 전수받은 레시피로 만드는 정통 프랑스 베이커리. 버터의 결이 살아있는 크루아상과 繊細한 페이스트리를 매일 아침 직접 구워냅니다. 프랑스 AOC 버터만을 사용하여 깊고 풍부한 맛을 자랑합니다.',
    shortDesc: '파리 정통 레시피의 버터 크루아상',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800',
    ],
    rating: 4.8,
    reviewCount: 342,
    location: '강남구',
    address: '서울 강남구 청담동 123-4 1층',
    tags: ['크루아상', '페이스트리', '프렌치'],
    category: '크루아상',
    isFavorite: false,
    isOpen: true,
    openTime: '08:00',
    closeTime: '20:00',
    phone: '02-1234-5678',
    website: 'lepetitcroissant.kr',
    priceRange: '₩₩₩',
    distance: '1.2km',
    waitTime: 15,
    menu: [
      { id: 'm1', name: 'Classic Butter Croissant', nameKo: '클래식 버터 크루아상', price: 5500, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400', isBest: true },
      { id: 'm2', name: 'Almond Croissant', nameKo: '아몬드 크루아상', price: 6500, image: 'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?auto=format&fit=crop&q=80&w=400', isNew: true },
      { id: 'm3', name: 'Pain au Chocolat', nameKo: '팽 오 쇼콜라', price: 6000, image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400' },
      { id: 'm4', name: 'Canelé', nameKo: '까눌레', price: 4500, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400' },
    ],
    reviews: [
      { id: 'r1', author: '김민준', avatar: 'https://i.pravatar.cc/40?img=1', rating: 5, content: '크루아상이 정말 맛있어요! 겉은 바삭하고 속은 촉촉한 최고의 크루아상. 강남에서 이런 퀄리티는 처음이에요.', date: '2026.04.28', images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=200'] },
      { id: 'r2', author: '이서연', avatar: 'https://i.pravatar.cc/40?img=5', rating: 5, content: '오픈런 해서 먹을 가치가 있어요. 아몬드 크루아상 강추합니다. 버터 향이 진하고 아몬드 크림이 듬뿍!', date: '2026.04.20' },
      { id: 'r3', author: '박지호', avatar: 'https://i.pravatar.cc/40?img=8', rating: 4, content: '맛은 훌륭한데 가격이 조금 비싸긴 해요. 그래도 퀄리티를 생각하면 납득이 가는 가격입니다.', date: '2026.04.15' },
    ],
  },
  {
    id: '2',
    name: 'Sourdough Society',
    nameKo: '사워도우 소사이어티',
    description: '72시간 장기 발효 공법으로 만드는 천연발효 빵 전문점. 화학 첨가물 없이 오직 밀가루, 물, 소금만으로 깊은 맛을 만들어냅니다. 건강한 빵 문화를 추구하며 유기농 밀가루만을 사용합니다.',
    shortDesc: '72시간 장기발효 천연효모 빵',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800',
    ],
    rating: 4.9,
    reviewCount: 521,
    location: '한남동',
    address: '서울 용산구 한남동 45-2 지하 1층',
    tags: ['식빵', '천연발효', '건강'],
    category: '식빵',
    isFavorite: true,
    isOpen: true,
    openTime: '09:00',
    closeTime: '19:00',
    phone: '02-9876-5432',
    website: 'sourdoughsociety.kr',
    priceRange: '₩₩',
    distance: '3.4km',
    waitTime: 30,
    menu: [
      { id: 'm1', name: 'Country Sourdough', nameKo: '컨트리 사워도우', price: 12000, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', isBest: true },
      { id: 'm2', name: 'Rye Bread', nameKo: '호밀빵', price: 10000, image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&q=80&w=400' },
      { id: 'm3', name: 'Walnut Sourdough', nameKo: '호두 사워도우', price: 14000, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400', isNew: true },
    ],
    reviews: [
      { id: 'r1', author: '최유진', avatar: 'https://i.pravatar.cc/40?img=9', rating: 5, content: '진짜 천연발효 사워도우의 정석. 신맛과 감칠맛의 밸런스가 완벽해요. 한남동에 이런 보석이!', date: '2026.05.01' },
      { id: 'r2', author: '정현우', avatar: 'https://i.pravatar.cc/40?img=12', rating: 5, content: '매주 토요일 오픈런 필수. 호두 사워도우는 예약하지 않으면 못 먹어요.', date: '2026.04.22' },
    ],
  },
  {
    id: '3',
    name: 'Cream & Crumb',
    nameKo: '크림 앤 크럼',
    description: '성수동 감성이 가득한 도넛 & 커피 전문점. 매일 아침 직접 만드는 수제 도넛과 스페셜티 커피의 완벽한 조합. 인스타그램에서 핫한 비주얼까지!',
    shortDesc: '성수동 힙한 수제 도넛 카페',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    ],
    rating: 4.7,
    reviewCount: 289,
    location: '성수동',
    address: '서울 성동구 성수이로 78 2층',
    tags: ['도넛', '카페', '비주얼맛집'],
    category: '도넛',
    isFavorite: false,
    isOpen: false,
    openTime: '11:00',
    closeTime: '21:00',
    phone: '02-5555-6789',
    website: 'creamandcrumb.co.kr',
    priceRange: '₩₩',
    distance: '5.1km',
    menu: [
      { id: 'm1', name: 'Cream Glazed Donut', nameKo: '크림 글레이즈 도넛', price: 4800, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', isBest: true },
      { id: 'm2', name: 'Matcha Croffle', nameKo: '말차 크로플', price: 5500, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400', isNew: true },
    ],
    reviews: [
      { id: 'r1', author: '강하늘', avatar: 'https://i.pravatar.cc/40?img=15', rating: 5, content: '성수동에서 제일 예쁜 카페! 도넛도 맛있고 분위기도 너무 좋아요. 데이트 코스 강추!', date: '2026.04.30' },
    ],
  },
  {
    id: '4',
    name: 'Salt & Dough',
    nameKo: '솔트 앤 도우',
    description: '일본 시오빵을 한국 입맛에 맞게 재해석한 소금빵 전문점. 버터를 듬뿍 넣어 만든 비밀 레시피로 겉은 바삭, 속은 촉촉한 최고의 소금빵을 선보입니다.',
    shortDesc: '줄 서서 먹는 소금빵 맛집',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800',
    ],
    rating: 4.6,
    reviewCount: 412,
    location: '마포구',
    address: '서울 마포구 합정동 32-1',
    tags: ['소금빵', '베이커리', '인기'],
    category: '소금빵',
    isFavorite: false,
    isOpen: true,
    openTime: '08:30',
    closeTime: '18:00',
    phone: '02-3456-7890',
    website: 'saltanddough.kr',
    priceRange: '₩',
    distance: '2.8km',
    waitTime: 20,
    menu: [
      { id: 'm1', name: 'Classic Salt Bread', nameKo: '클래식 소금빵', price: 2800, image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400', isBest: true },
      { id: 'm2', name: 'Cheese Salt Bread', nameKo: '치즈 소금빵', price: 3500, image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=400', isNew: true },
    ],
    reviews: [
      { id: 'r1', author: '윤지아', avatar: 'https://i.pravatar.cc/40?img=20', rating: 5, content: '합정 소금빵 성지! 오전에 가야 fresh한 걸 먹을 수 있어요. 치즈 소금빵은 필수!!', date: '2026.05.02' },
    ],
  },
  {
    id: '5',
    name: 'Mille Cake',
    nameKo: '밀레 케이크',
    description: '프랑스 정통 밀크레이프와 제철 과일 케이크 전문점. 40겹의 얇은 크레이프와 직접 만드는 크림으로 만드는 핸드메이드 케이크. 기념일 맞춤 케이크 예약 가능.',
    shortDesc: '40겹 수제 밀크레이프 케이크',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
    ],
    rating: 4.9,
    reviewCount: 178,
    location: '서초구',
    address: '서울 서초구 방배동 11-22',
    tags: ['케이크', '밀크레이프', '프리미엄'],
    category: '케이크',
    isFavorite: true,
    isOpen: true,
    openTime: '10:00',
    closeTime: '20:00',
    phone: '02-7777-8888',
    website: 'millecake.kr',
    priceRange: '₩₩₩',
    distance: '4.5km',
    menu: [
      { id: 'm1', name: 'Original Mille Crepe', nameKo: '오리지널 밀크레이프', price: 8500, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400', isBest: true },
      { id: 'm2', name: 'Strawberry Season Cake', nameKo: '딸기 시즌 케이크', price: 9500, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400', isNew: true },
    ],
    reviews: [
      { id: 'r1', author: '임수빈', avatar: 'https://i.pravatar.cc/40?img=25', rating: 5, content: '기념일 케이크 주문했는데 정말 감동이었어요. 맛도 비주얼도 완벽!', date: '2026.04.29' },
    ],
  },
  {
    id: '6',
    name: 'Bagel Bros',
    nameKo: '베이글 브로스',
    description: '뉴욕 스타일 정통 베이글 전문점. 케틀 베이킹 방식으로 만들어 쫄깃한 식감이 살아있는 진짜 베이글. 다양한 크림치즈와 토핑으로 나만의 베이글을 완성하세요.',
    shortDesc: 'NY 스타일 케틀 베이킹 베이글',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57ef3?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1509722747041-616f39b57ef3?auto=format&fit=crop&q=80&w=800',
    ],
    rating: 4.5,
    reviewCount: 203,
    location: '이태원',
    address: '서울 용산구 이태원동 56-7',
    tags: ['베이글', '뉴욕', '브런치'],
    category: '베이글',
    isFavorite: false,
    isOpen: true,
    openTime: '08:00',
    closeTime: '16:00',
    phone: '02-2222-3333',
    website: 'bagelbros.kr',
    priceRange: '₩₩',
    distance: '3.9km',
    menu: [
      { id: 'm1', name: 'Plain Bagel', nameKo: '플레인 베이글', price: 3500, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57ef3?auto=format&fit=crop&q=80&w=400', isBest: true },
    ],
    reviews: [
      { id: 'r1', author: '한도윤', avatar: 'https://i.pravatar.cc/40?img=30', rating: 5, content: '이태원 베이글 성지. 쫄깃함이 뉴욕 현지와 똑같아요!', date: '2026.05.03' },
    ],
  },
];

export const useBakeryStore = create<BakeryState>((set) => ({
  bakeries: MOCK_BAKERIES,
  searchQuery: '',
  selectedCategory: '전체',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  toggleFavorite: (id) =>
    set((state) => ({
      bakeries: state.bakeries.map((b) =>
        b.id === id ? { ...b, isFavorite: !b.isFavorite } : b
      ),
    })),
}));
