/**
 * Instructor profiles — mock data.
 * Fields marked [MOCK] should be replaced with real data before publishing.
 * Instructor IDs must match the instructorId field in courses.ts.
 */

export interface InstructorProfile {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  /** Languages this instructor teaches */
  languages: string[];
  /** e.g. "12 years" */
  experience: string;
  /** Academic degrees, certifications, etc. */
  qualifications: string[];
  /** Areas of expertise */
  specializations: string[];
}

export const instructors: InstructorProfile[] = [
  {
    id: 1,
    name: "Amel Benali",
    title: "Senior French Language Instructor",
    bio: "Fictional Algerian instructor profile based in Algiers. Her sample teaching approach combines French foundations, pronunciation practice, and everyday conversation.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    languages: ["French"],
    experience: "To be confirmed",
    qualifications: [
      "Teaching qualification — sample detail to be confirmed",
      "French language certification — sample detail to be confirmed",
    ],
    specializations: [
      "Cultural immersion",
      "DELF/DALF exam preparation",
      "Beginner to advanced progression",
    ],
  },
  {
    id: 2,
    name: "Sofiane Bensaïd",
    title: "Business German Specialist",
    bio: "Fictional Algerian instructor profile based in Algiers. His sample lessons focus on German vocabulary and practical communication for work.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    languages: ["German"],
    experience: "To be confirmed",
    qualifications: [
      "German teaching qualification — sample detail to be confirmed",
      "German language certification — sample detail to be confirmed",
    ],
    specializations: [
      "Business German",
      "Corporate communication",
      "Trade and finance vocabulary",
    ],
  },
  {
    id: 3,
    name: "Yasmine Haddad",
    title: "Spanish Conversation Coach",
    bio: "Fictional Algerian instructor profile based in Algiers. Her sample lessons use guided conversation and role-play to build Spanish confidence.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    languages: ["Spanish"],
    experience: "To be confirmed",
    qualifications: [
      "Spanish teaching qualification — sample detail to be confirmed",
      "Spanish language certification — sample detail to be confirmed",
    ],
    specializations: [
      "Conversational fluency",
      "Latin American cultural contexts",
      "Beginner-focused methodology",
    ],
  },
  {
    id: 4,
    name: "Rachid Meziane",
    title: "Mandarin Language Educator",
    bio: "Fictional Algerian instructor profile based in Algiers. His sample teaching approach introduces Mandarin pronunciation, tones, and everyday expressions.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    languages: ["Mandarin Chinese"],
    experience: "To be confirmed",
    qualifications: [
      "Mandarin teaching qualification — sample detail to be confirmed",
      "Mandarin language certification — sample detail to be confirmed",
    ],
    specializations: [
      "Pinyin and tonal accuracy",
      "Character writing and recognition",
      "HSK exam preparation",
    ],
  },
  {
    id: 5,
    name: "Nadia Bouzid",
    title: "English for Business & Academic Purposes",
    bio: "Fictional Algerian instructor profile based in Algiers. Her sample lessons focus on practical English for study, work, and everyday communication.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    languages: ["English"],
    experience: "To be confirmed",
    qualifications: [
      "English teaching qualification — sample detail to be confirmed",
      "English language certification — sample detail to be confirmed",
    ],
    specializations: [
      "Business and academic English",
      "IELTS and Cambridge Business English preparation",
      "Executive communication coaching",
    ],
  },
  {
    id: 6,
    name: "Karim Aït-Larbi",
    title: "Japanese Language & Culture Instructor",
    bio: "Fictional Algerian instructor profile based in Algiers. His sample lessons combine Japanese language foundations with cultural context and everyday etiquette.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    languages: ["Japanese"],
    experience: "To be confirmed",
    qualifications: [
      "Japanese teaching qualification — sample detail to be confirmed",
      "Japanese language certification — sample detail to be confirmed",
    ],
    specializations: [
      "Hiragana, katakana, and kanji",
      "JLPT N5/N4 preparation",
      "Japanese culture and etiquette",
    ],
  },
];
