export type Profile = {
  id: number;
  name: string;
  age: number;
  location: string;
  job: string;
  kids: string;
  kidsDetail?: string;
  status: string;
  verified: boolean;
  photo: string;
  emoji: string;
  gradient: string;
  bgColor: string;
  bio: string;
  tags: string[];
  intent: string;
  height: string;
  religion: string;
  smoking: string;
  drinking: string;
  matchScore: number;
  photos?: string[];
  captions?: string[];
};

export type ChatMessage = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};

export type Conversation = {
  profileId: number;
  messages: ChatMessage[];
  lastSeen: string;
};

export const profiles: Profile[] = [
  {
    id: 1,
    name: "박준호",
    age: 42,
    location: "서울 마포구",
    job: "소프트웨어 엔지니어",
    kids: "자녀 없음",
    status: "이혼 후 2년",
    verified: true,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800&q=80",
    emoji: "👨‍💻",
    gradient: "from-stone-200 to-stone-300",
    bgColor: "bg-stone-50",
    bio: "아이 없이 혼자 살고 있어요. 주말엔 등산이나 독서를 즐깁니다. 같이 밥 먹고, 영화 보고, 소소한 일상을 나눌 분 찾습니다. 진지하게 새 출발 원합니다.",
    tags: ["독서", "등산", "요리", "영화"],
    intent: "진지한 만남",
    height: "178cm",
    religion: "무교",
    smoking: "비흡연",
    drinking: "가끔",
    matchScore: 97,
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=500&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80",
      "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=400&h=500&q=80",
    ],
    captions: [
      "프로필 사진입니다 😊",
      "주말 등산 다녀왔어요. 북한산 정상!",
      "요즘 즐겨 읽는 책들과 함께",
      "친구들이랑 마포 카페에서",
    ],
  },
  {
    id: 2,
    name: "최동현",
    age: 45,
    location: "서울 강남구",
    job: "치과의사",
    kids: "1명 (16세, 비동거)",
    kidsDetail: "아이는 전 배우자와 함께 살고 있어요",
    status: "이혼 후 3년",
    verified: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80",
    emoji: "👨‍⚕️",
    gradient: "from-slate-200 to-slate-300",
    bgColor: "bg-slate-50",
    bio: "딸이 하나 있고 격주로 만납니다. 아이 문제 이해해주실 분이면 좋겠어요. 여행을 좋아하고 맛집 탐방도 즐깁니다.",
    tags: ["여행", "맛집", "골프", "와인"],
    intent: "진지한 만남",
    height: "175cm",
    religion: "기독교",
    smoking: "비흡연",
    drinking: "즐김",
    matchScore: 94,
    photos: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&h=500&q=80",
    ],
    captions: [
      "반갑습니다 🙂",
      "골프 라운딩 후 한 컷",
      "딸이랑 제주도 여행",
    ],
  },
  {
    id: 3,
    name: "이상혁",
    age: 40,
    location: "경기 성남시",
    job: "스타트업 창업자",
    kids: "자녀 없음",
    status: "이혼 후 1년 6개월",
    verified: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
    emoji: "🧑‍💼",
    gradient: "from-zinc-200 to-zinc-300",
    bgColor: "bg-zinc-50",
    bio: "창업해서 바쁘게 살고 있지만, 퇴근 후엔 혼자 있기가 너무 조용하더라고요. 함께 저녁 먹고 대화 나눌 수 있는 분 찾습니다.",
    tags: ["러닝", "넷플릭스", "커피", "드라이브"],
    intent: "진지한 만남",
    height: "180cm",
    religion: "무교",
    smoking: "비흡연",
    drinking: "가끔",
    matchScore: 91,
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80",
    ],
  },
  {
    id: 4,
    name: "김민재",
    age: 38,
    location: "서울 송파구",
    job: "중학교 교사",
    kids: "1명 (8세, 동거)",
    kidsDetail: "아이와 함께 살고 있어요. 이해해주실 분만 연락주세요",
    status: "이혼 후 4년",
    verified: true,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=800&q=80",
    emoji: "👨‍🏫",
    gradient: "from-neutral-200 to-neutral-300",
    bgColor: "bg-neutral-50",
    bio: "아들 하나 키우며 살고 있어요. 아이가 있는 분도 환영해요. 서로 상황 이해하면서 천천히 알아가고 싶습니다.",
    tags: ["육아", "캠핑", "보드게임", "요리"],
    intent: "재혼 희망",
    height: "174cm",
    religion: "불교",
    smoking: "비흡연",
    drinking: "거의 안 함",
    matchScore: 88,
  },
  {
    id: 5,
    name: "정우성",
    age: 44,
    location: "서울 용산구",
    job: "건축사무소 대표",
    kids: "자녀 없음",
    status: "사별 후 2년",
    verified: true,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=800&q=80",
    emoji: "🧔",
    gradient: "from-gray-200 to-gray-300",
    bgColor: "bg-gray-50",
    bio: "2년 전 아내를 잃었어요. 혼자인 시간이 너무 길어졌습니다. 새 출발이 두렵지만, 다시 누군가와 함께하고 싶습니다.",
    tags: ["건축", "아트", "클래식", "와인"],
    intent: "진지한 만남",
    height: "181cm",
    religion: "무교",
    smoking: "비흡연",
    drinking: "가끔",
    matchScore: 85,
  },
];

export const myProfile = {
  name: "김지수",
  age: 38,
  location: "서울 강남구",
  job: "마케터",
  kids: "1명 (7세, 동거)",
  status: "이혼 후 2년 6개월",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=800&q=80",
  emoji: "👩",
  gradient: "from-rose-300 to-rose-400",
  bio: "7살 딸과 함께 살고 있어요. 서로의 상황을 이해하면서 천천히 알아가고 싶습니다. 함께 밥 한 끼 먹을 수 있는 분이면 좋겠어요.",
  tags: ["요리", "독서", "카페", "육아"],
  intent: "진지한 만남",
  matchScore: 97,
  responseRate: 92,
  letters: 14,
};

export const conversations: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, from: "them", text: "안녕하세요, 지수님. 프로필 잘 봤어요 😊", time: "어제 오후 7:22" },
    { id: 2, from: "me", text: "안녕하세요! 반갑습니다 ☺️", time: "어제 오후 7:45" },
    { id: 3, from: "them", text: "아이가 있으신 거 보고 저도 공감이 많이 됐어요. 혼자 키우시는 거 정말 대단하세요.", time: "어제 오후 8:01" },
    { id: 4, from: "me", text: "감사해요 ㅎㅎ 쉽진 않지만 그래도 아이가 있어서 더 열심히 살게 되는 것 같아요", time: "어제 오후 8:10" },
    { id: 5, from: "them", text: "맞아요. 저도 그런 마음 잘 알 것 같아요. 혹시 이번 주말에 커피 한 잔 하실 수 있으세요?", time: "오늘 오전 10:30" },
  ],
  2: [
    { id: 1, from: "them", text: "안녕하세요 지수님, 편지 잘 받았습니다 💌", time: "2일 전" },
    { id: 2, from: "me", text: "읽어주셔서 감사해요! 프로필 보고 많이 공감됐어요", time: "2일 전" },
    { id: 3, from: "them", text: "저도요. 아이 이야기 이해해주셔서 감사합니다", time: "어제" },
  ],
};
