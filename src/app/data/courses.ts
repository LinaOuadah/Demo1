export type StudyType = "In-person" | "Online" | "Both";
export type Level = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Instructor {
  name: string;
  title: string;
  bio: string;
}

export interface Course {
  id: number;
  title: string;
  language: string;
  description: string;
  image: string;
  duration: string;
  level: Level;
  studyType: StudyType;
  students: number;
  rating: number;
  price: string;
  priceDZD: string;
  sessionsPerWeek: number;
  sessionDuration: string;
  /** e.g. "Mon, Wed, Fri" */
  days: string;
  /** e.g. "09:00 – 10:30" */
  sessionTime: string;
  /** ISO-parseable date string, e.g. "3 November 2026" */
  startDate: string;
  seatsAvailable: number;
  totalSeats: number;
  learningObjectives: string[];
  prerequisites: string[];
  instructor: Instructor;
  /** Links to InstructorProfile.id in instructors.ts */
  instructorId: number;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "French Language Mastery",
    language: "French",
    description:
      "Comprehensive French course from beginner to advanced level with cultural immersion. You will develop reading, writing, speaking, and listening skills while gaining an appreciation for Francophone culture.",
    image:
      "https://images.unsplash.com/photo-1707273549945-62138ce5aafb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBsYW5ndWFnZSUyMGNsYXNzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzU2OTMxNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "6 months",
    level: "All Levels",
    studyType: "Both",
    students: 342,
    rating: 4.8,
    price: "DZD 6,750",
    priceDZD: "DZD 6,750",
    sessionsPerWeek: 3,
    sessionDuration: "90 min",
    days: "Sun, Tue, Thu",
    sessionTime: "09:00 – 10:30",
    startDate: "3 November 2026",
    seatsAvailable: 8,
    totalSeats: 20,
    learningObjectives: [
      "Master French pronunciation and basic phonetics",
      "Hold everyday conversations with confidence",
      "Read and write French at an intermediate level",
      "Understand French culture, customs, and etiquette",
      "Prepare for DELF/DALF certification exams",
    ],
    prerequisites: [],
    instructor: {
      name: "Amel Benali",
      title: "Senior French Language Instructor",
      bio: "Fictional Algerian instructor profile based in Algiers. Focuses on practical French conversation, pronunciation, and cultural context.",
    },
    instructorId: 1,
  },
  {
    id: 2,
    title: "German Business Communication",
    language: "German",
    description:
      "Professional German for business contexts, presentations, and corporate communication. Master business vocabulary, email etiquette, and formal presentation skills used in German-speaking markets.",
    image:
      "https://images.unsplash.com/photo-1717052769874-dcc69c5ff822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBsYW5ndWFnZSUyMGJvb2slMjBzdHVkeXxlbnwxfHx8fDE3NTY5MzE1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "4 months",
    level: "Intermediate",
    studyType: "In-person",
    students: 198,
    rating: 4.9,
    price: "DZD 8,100",
    priceDZD: "DZD 8,100",
    sessionsPerWeek: 2,
    sessionDuration: "120 min",
    days: "Sun, Wed",
    sessionTime: "17:00 – 19:00",
    startDate: "10 November 2026",
    seatsAvailable: 5,
    totalSeats: 15,
    learningObjectives: [
      "Write professional German emails and reports",
      "Deliver business presentations in German",
      "Navigate corporate negotiations and meetings",
      "Use formal register appropriate to German business culture",
      "Expand industry-specific German vocabulary",
    ],
    prerequisites: [
      "A2 level German or equivalent (basic conversational German)",
    ],
    instructor: {
      name: "Sofiane Bensaïd",
      title: "Business German Specialist",
      bio: "Fictional Algerian instructor profile based in Algiers. Focuses on German for professional communication and workplace situations.",
    },
    instructorId: 2,
  },
  {
    id: 3,
    title: "Spanish Conversation",
    language: "Spanish",
    description:
      "Interactive Spanish speaking course focusing on real-world conversations and cultural nuances. Build confidence through role-plays, group discussions, and guided speaking exercises.",
    image:
      "https://images.unsplash.com/photo-1733824204474-e1b329a33612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwbGFuZ3VhZ2UlMjBsZWFybmluZyUyMGNsYXNzfGVufDF8fHx8MTc1NjkzMTU4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "3 months",
    level: "Beginner",
    studyType: "Online",
    students: 456,
    rating: 4.7,
    price: "DZD 5,400",
    priceDZD: "DZD 5,400",
    sessionsPerWeek: 4,
    sessionDuration: "60 min",
    days: "Sun, Mon, Tue, Wed",
    sessionTime: "18:00 – 19:00",
    startDate: "5 November 2026",
    seatsAvailable: 12,
    totalSeats: 25,
    learningObjectives: [
      "Introduce yourself and discuss daily topics in Spanish",
      "Understand and respond in common social situations",
      "Build foundational vocabulary across key themes",
      "Appreciate regional Spanish-speaking cultures",
      "Develop listening skills through authentic audio materials",
    ],
    prerequisites: [],
    instructor: {
      name: "Yasmine Haddad",
      title: "Spanish Conversation Coach",
      bio: "Fictional Algerian instructor profile based in Algiers. Uses guided conversations and role-play to build everyday Spanish confidence.",
    },
    instructorId: 3,
  },
  {
    id: 4,
    title: "Mandarin Chinese Basics",
    language: "Mandarin Chinese",
    description:
      "Introduction to Mandarin Chinese including characters, pronunciation, and basic conversation. Learn pinyin, tones, essential vocabulary, and simple sentence structures from scratch.",
    image:
      "https://images.unsplash.com/photo-1723613877973-97b536a0202f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwbWFuZGFyaW4lMjBsZWFybmluZ3xlbnwxfHx8fDE3NTY5MzE1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "8 months",
    level: "Beginner",
    studyType: "In-person",
    students: 123,
    rating: 4.6,
    price: "DZD 9,450",
    priceDZD: "DZD 9,450",
    sessionsPerWeek: 3,
    sessionDuration: "90 min",
    days: "Sun, Tue, Thu",
    sessionTime: "10:00 – 11:30",
    startDate: "17 November 2026",
    seatsAvailable: 10,
    totalSeats: 18,
    learningObjectives: [
      "Master the four Mandarin tones and pinyin romanisation",
      "Read and write 150+ essential Chinese characters",
      "Conduct basic conversations on everyday topics",
      "Understand Mandarin spoken at a natural pace",
      "Gain cultural insight into Chinese society and customs",
    ],
    prerequisites: [],
    instructor: {
      name: "Rachid Meziane",
      title: "Mandarin Language Educator",
      bio: "Fictional Algerian instructor profile based in Algiers. Introduces Mandarin pronunciation, tones, and everyday vocabulary step by step.",
    },
    instructorId: 4,
  },
  {
    id: 5,
    title: "English for Professionals",
    language: "English",
    description:
      "Advanced English communication for workplace success and international business. Sharpen your presentation, negotiation, and written communication skills for a global audience.",
    image:
      "https://images.unsplash.com/photo-1567206163313-9e34c830557a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwbGFuZ3VhZ2UlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTY4OTU0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "5 months",
    level: "Advanced",
    studyType: "Both",
    students: 567,
    rating: 4.9,
    price: "DZD 7,560",
    priceDZD: "DZD 7,560",
    sessionsPerWeek: 3,
    sessionDuration: "90 min",
    days: "Sun, Tue, Thu",
    sessionTime: "07:00 – 08:30",
    startDate: "4 November 2026",
    seatsAvailable: 3,
    totalSeats: 20,
    learningObjectives: [
      "Communicate with authority in professional settings",
      "Write polished reports, proposals, and business emails",
      "Deliver compelling presentations to international audiences",
      "Navigate negotiations and cross-cultural business meetings",
      "Prepare for IELTS or Cambridge Business English exams",
    ],
    prerequisites: [
      "B2 level English or equivalent (upper-intermediate)",
    ],
    instructor: {
      name: "Nadia Bouzid",
      title: "English for Business & Academic Purposes",
      bio: "Fictional Algerian instructor profile based in Algiers. Helps learners develop clear, confident English for academic and professional settings.",
    },
    instructorId: 5,
  },
  {
    id: 6,
    title: "Japanese Language & Culture",
    language: "Japanese",
    description:
      "Comprehensive Japanese course including language fundamentals and cultural understanding. Cover hiragana, katakana, basic kanji, and everyday conversation alongside Japanese customs.",
    image:
      "https://images.unsplash.com/photo-1610792472828-d27010ade45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGxhbmd1YWdlJTIwY2xhc3N8ZW58MXx8fHwxNzU2OTMxNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "7 months",
    level: "All Levels",
    studyType: "Online",
    students: 234,
    rating: 4.8,
    price: "DZD 8,640",
    priceDZD: "DZD 8,640",
    sessionsPerWeek: 3,
    sessionDuration: "90 min",
    days: "Sun, Tue, Thu",
    sessionTime: "15:00 – 16:30",
    startDate: "12 November 2026",
    seatsAvailable: 7,
    totalSeats: 20,
    learningObjectives: [
      "Read and write hiragana and katakana fluently",
      "Recognise and write 100+ essential kanji characters",
      "Hold basic conversations on familiar topics",
      "Understand Japanese etiquette and social customs",
      "Prepare for JLPT N5/N4 certification",
    ],
    prerequisites: [],
    instructor: {
      name: "Karim Aït-Larbi",
      title: "Japanese Language & Culture Instructor",
      bio: "Fictional Algerian instructor profile based in Algiers. Combines Japanese language foundations with introductions to culture and everyday etiquette.",
    },
    instructorId: 6,
  },
];
