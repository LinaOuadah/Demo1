import type { Course } from "../data/courses";
import type { InstructorProfile } from "../data/instructors";
import type { Language } from "./LanguageContext";

const courseCopy: Record<number, Record<Language, { title: string; description: string; language: string; objectives: string[]; prerequisite: string }>> = {
  1: {
    fr: {
      title: "Maîtrise du français",
      language: "Français",
      description: "Cours complet de français, du niveau débutant à avancé. Développez vos compétences en compréhension orale et écrite, en expression et en grammaire, tout en découvrant les cultures francophones.",
      objectives: ["Maîtriser la prononciation et la phonétique françaises", "Tenir des conversations quotidiennes avec assurance", "Lire et écrire en français au niveau intermédiaire", "Découvrir la culture, les usages et les codes francophones", "Se préparer aux certifications DELF/DALF"],
      prerequisite: "Aucun prérequis — cours ouvert aux grands débutants.",
    },
    ar: {
      title: "إتقان اللغة الفرنسية",
      language: "الفرنسية",
      description: "دورة شاملة في اللغة الفرنسية من المبتدئ إلى المتقدم. طوّر مهارات القراءة والكتابة والتحدث والاستماع واكتشف الثقافات الناطقة بالفرنسية.",
      objectives: ["إتقان النطق والأصوات الفرنسية", "إجراء محادثات يومية بثقة", "القراءة والكتابة بالفرنسية إلى المستوى المتوسط", "التعرف على الثقافة والعادات الناطقة بالفرنسية", "التحضير لشهادات DELF/DALF"],
      prerequisite: "لا توجد متطلبات سابقة — الدورة مناسبة للمبتدئين تماماً.",
    },
  },
  2: {
    fr: {
      title: "Allemand professionnel",
      language: "Allemand",
      description: "Développez votre allemand pour le monde professionnel, les présentations et la communication en entreprise. Apprenez le vocabulaire professionnel, la rédaction de courriels et les techniques de présentation.",
      objectives: ["Rédiger des courriels et rapports professionnels en allemand", "Présenter des sujets professionnels en allemand", "Participer à des réunions et négociations", "Utiliser le registre adapté au milieu professionnel", "Développer un vocabulaire spécialisé"],
      prerequisite: "Niveau A2 en allemand ou équivalent.",
    },
    ar: {
      title: "التواصل المهني باللغة الألمانية",
      language: "الألمانية",
      description: "طوّر لغتك الألمانية للتواصل في بيئة العمل والعروض التقديمية. تعلّم مفردات الأعمال وكتابة الرسائل الرسمية ومهارات العرض.",
      objectives: ["كتابة رسائل وتقارير مهنية بالألمانية", "تقديم عروض مهنية بالألمانية", "المشاركة في الاجتماعات والمفاوضات", "استخدام أسلوب رسمي مناسب للعمل", "توسيع المفردات المهنية المتخصصة"],
      prerequisite: "مستوى A2 في الألمانية أو ما يعادله.",
    },
  },
  3: {
    fr: {
      title: "Conversation en espagnol",
      language: "Espagnol",
      description: "Un cours interactif centré sur les conversations de la vie réelle et les nuances culturelles. Gagnez en aisance grâce aux jeux de rôle, aux discussions et aux exercices guidés.",
      objectives: ["Se présenter et parler de sujets quotidiens en espagnol", "Comprendre et répondre dans des situations courantes", "Développer le vocabulaire essentiel", "Découvrir les cultures hispanophones", "Améliorer la compréhension orale grâce à des contenus authentiques"],
      prerequisite: "Aucun prérequis — cours ouvert aux grands débutants.",
    },
    ar: {
      title: "المحادثة باللغة الإسبانية",
      language: "الإسبانية",
      description: "دورة تفاعلية تركز على محادثات الحياة اليومية والفروق الثقافية. عزز ثقتك من خلال تمثيل الأدوار والنقاشات والتمارين الموجهة.",
      objectives: ["التعريف بالنفس ومناقشة مواضيع يومية بالإسبانية", "الفهم والرد في المواقف الاجتماعية الشائعة", "بناء مفردات أساسية", "التعرف على ثقافات البلدان الناطقة بالإسبانية", "تطوير الاستماع عبر مواد واقعية"],
      prerequisite: "لا توجد متطلبات سابقة — الدورة مناسبة للمبتدئين تماماً.",
    },
  },
  4: {
    fr: {
      title: "Bases du mandarin",
      language: "Chinois mandarin",
      description: "Découvrez le mandarin, ses caractères, sa prononciation et les conversations essentielles. Apprenez le pinyin, les tons et des structures simples dès le début.",
      objectives: ["Maîtriser les quatre tons et le pinyin", "Lire et écrire plus de 150 caractères essentiels", "Tenir des conversations simples du quotidien", "Comprendre le mandarin parlé à vitesse naturelle", "Découvrir la société et les coutumes chinoises"],
      prerequisite: "Aucun prérequis — cours ouvert aux grands débutants.",
    },
    ar: {
      title: "أساسيات اللغة الصينية (الماندرين)",
      language: "الصينية الماندرين",
      description: "مقدمة في اللغة الصينية تشمل الحروف والنطق والمحادثة الأساسية. تعلّم نظام بينيين والنغمات والمفردات والتراكيب البسيطة من البداية.",
      objectives: ["إتقان نغمات الماندرين الأربع ونظام بينيين", "قراءة وكتابة أكثر من 150 حرفاً أساسياً", "إجراء محادثات أساسية حول الحياة اليومية", "فهم الماندرين المنطوق بسرعة طبيعية", "التعرف على المجتمع والعادات الصينية"],
      prerequisite: "لا توجد متطلبات سابقة — الدورة مناسبة للمبتدئين تماماً.",
    },
  },
  5: {
    fr: {
      title: "Anglais professionnel",
      language: "Anglais",
      description: "Améliorez votre anglais professionnel pour réussir au travail et dans les échanges internationaux. Renforcez vos compétences en présentation, négociation et communication écrite.",
      objectives: ["Communiquer avec assurance en milieu professionnel", "Rédiger des rapports, propositions et courriels professionnels", "Présenter efficacement devant un public international", "Participer à des négociations et réunions interculturelles", "Se préparer aux examens IELTS ou Cambridge Business English"],
      prerequisite: "Niveau B2 en anglais ou équivalent.",
    },
    ar: {
      title: "الإنجليزية للأغراض المهنية",
      language: "الإنجليزية",
      description: "طوّر مهارات التواصل باللغة الإنجليزية لتحقيق النجاح المهني والتواصل الدولي. حسّن مهارات العرض والتفاوض والكتابة.",
      objectives: ["التواصل بثقة في بيئة العمل", "كتابة التقارير والمقترحات ورسائل الأعمال", "تقديم عروض مؤثرة لجمهور دولي", "إدارة المفاوضات والاجتماعات متعددة الثقافات", "التحضير لاختبارات IELTS أو Cambridge Business English"],
      prerequisite: "مستوى B2 في الإنجليزية أو ما يعادله.",
    },
  },
  6: {
    fr: {
      title: "Langue et culture japonaises",
      language: "Japonais",
      description: "Apprenez les bases du japonais et découvrez sa culture. Étudiez les hiragana, katakana, kanji essentiels et la conversation quotidienne.",
      objectives: ["Lire et écrire les hiragana et katakana", "Reconnaître et écrire plus de 100 kanji essentiels", "Tenir des conversations simples sur des sujets familiers", "Comprendre les règles de politesse et les usages japonais", "Se préparer aux certifications JLPT N5/N4"],
      prerequisite: "Aucun prérequis — cours ouvert aux grands débutants.",
    },
    ar: {
      title: "اللغة والثقافة اليابانية",
      language: "اليابانية",
      description: "تعلّم أساسيات اللغة اليابانية واكتشف ثقافتها. ادرس الهيراغانا والكاتاكانا والكانجي الأساسي والمحادثات اليومية.",
      objectives: ["قراءة وكتابة الهيراغانا والكاتاكانا", "التعرف على أكثر من 100 حرف كانجي أساسي وكتابتها", "إجراء محادثات بسيطة حول مواضيع مألوفة", "فهم آداب التعامل والعادات اليابانية", "التحضير لشهادات JLPT N5/N4"],
      prerequisite: "لا توجد متطلبات سابقة — الدورة مناسبة للمبتدئين تماماً.",
    },
  },
};

const instructorCopy: Record<number, Record<Language, { name: string; title: string; bio: string; qualifications: string[]; specializations: string[] }>> = {
  1: {
    fr: { name: "Amel Benali", title: "Enseignante principale de français", bio: "Profil fictif d’une enseignante algérienne basée à Alger. Sa méthode associe les bases du français, la prononciation et la conversation quotidienne.", qualifications: ["Qualification pédagogique — information fictive à confirmer", "Certification de français — information fictive à confirmer"], specializations: ["Immersion culturelle", "Préparation DELF/DALF", "Progression du débutant à l’avancé"] },
    ar: { name: "آمال بن علي", title: "مدرسة أولى للغة الفرنسية", bio: "ملف افتراضي لمدرسة جزائرية في الجزائر العاصمة. تجمع طريقتها بين أساسيات الفرنسية والنطق والمحادثة اليومية.", qualifications: ["مؤهل تربوي — معلومة افتراضية تحتاج إلى تأكيد", "شهادة في الفرنسية — معلومة افتراضية تحتاج إلى تأكيد"], specializations: ["الاندماج الثقافي", "التحضير لـ DELF/DALF", "التدرج من المبتدئ إلى المتقدم"] },
  },
  2: {
    fr: { name: "Sofiane Bensaïd", title: "Spécialiste de l’allemand professionnel", bio: "Profil fictif d’un enseignant algérien basé à Alger. Ses cours types portent sur le vocabulaire allemand et la communication professionnelle.", qualifications: ["Qualification d’enseignement de l’allemand — à confirmer", "Certification de langue allemande — à confirmer"], specializations: ["Allemand professionnel", "Communication en entreprise", "Vocabulaire commercial"] },
    ar: { name: "سفيان بن سعيد", title: "متخصص في الألمانية المهنية", bio: "ملف افتراضي لمدرس جزائري في الجزائر العاصمة. تركز دروسه النموذجية على مفردات الألمانية والتواصل في العمل.", qualifications: ["مؤهل تدريس الألمانية — يحتاج إلى تأكيد", "شهادة لغة ألمانية — تحتاج إلى تأكيد"], specializations: ["الألمانية المهنية", "التواصل المؤسسي", "مفردات التجارة"] },
  },
  3: {
    fr: { name: "Yasmine Haddad", title: "Formatrice en conversation espagnole", bio: "Profil fictif d’une enseignante algérienne basée à Alger. Ses cours types utilisent la conversation guidée et les jeux de rôle pour développer l’aisance en espagnol.", qualifications: ["Qualification d’enseignement de l’espagnol — à confirmer", "Certification de langue espagnole — à confirmer"], specializations: ["Aisance conversationnelle", "Cultures hispanophones", "Méthode pour débutants"] },
    ar: { name: "ياسمين حداد", title: "مدربة محادثة باللغة الإسبانية", bio: "ملف افتراضي لمدرسة جزائرية في الجزائر العاصمة. تستخدم دروسها النموذجية المحادثة الموجهة وتمثيل الأدوار لتعزيز الثقة بالإسبانية.", qualifications: ["مؤهل تدريس الإسبانية — يحتاج إلى تأكيد", "شهادة لغة إسبانية — تحتاج إلى تأكيد"], specializations: ["الطلاقة في المحادثة", "الثقافات الناطقة بالإسبانية", "منهجية للمبتدئين"] },
  },
  4: {
    fr: { name: "Rachid Meziane", title: "Enseignant de mandarin", bio: "Profil fictif d’un enseignant algérien basé à Alger. Sa méthode type présente progressivement la prononciation, les tons et les expressions courantes du mandarin.", qualifications: ["Qualification d’enseignement du mandarin — à confirmer", "Certification de langue mandarine — à confirmer"], specializations: ["Prononciation et tons", "Écriture des caractères", "Préparation HSK"] },
    ar: { name: "رشيد مزيان", title: "مدرس اللغة الصينية الماندرين", bio: "ملف افتراضي لمدرس جزائري في الجزائر العاصمة. يقدم منهجه النموذجي نطق الماندرين ونغماتها وتعبيراتها اليومية تدريجياً.", qualifications: ["مؤهل تدريس الماندرين — يحتاج إلى تأكيد", "شهادة لغة الماندرين — تحتاج إلى تأكيد"], specializations: ["النطق والنغمات", "كتابة الحروف", "التحضير لاختبار HSK"] },
  },
  5: {
    fr: { name: "Nadia Bouzid", title: "Anglais professionnel et académique", bio: "Profil fictif d’une enseignante algérienne basée à Alger. Ses cours types développent un anglais clair et assuré pour les études, le travail et la vie quotidienne.", qualifications: ["Qualification d’enseignement de l’anglais — à confirmer", "Certification de langue anglaise — à confirmer"], specializations: ["Anglais professionnel et académique", "Préparation IELTS", "Communication professionnelle"] },
    ar: { name: "نادية بوزيد", title: "الإنجليزية للأعمال والأغراض الأكاديمية", bio: "ملف افتراضي لمدرسة جزائرية في الجزائر العاصمة. تساعد دروسها النموذجية على تطوير إنجليزية واضحة وواثقة للدراسة والعمل والحياة اليومية.", qualifications: ["مؤهل تدريس الإنجليزية — يحتاج إلى تأكيد", "شهادة لغة إنجليزية — تحتاج إلى تأكيد"], specializations: ["الإنجليزية المهنية والأكاديمية", "التحضير لاختبار IELTS", "التواصل المهني"] },
  },
  6: {
    fr: { name: "Karim Aït-Larbi", title: "Enseignant de japonais et de culture", bio: "Profil fictif d’un enseignant algérien basé à Alger. Ses cours types associent les bases du japonais à la culture et aux usages quotidiens.", qualifications: ["Qualification d’enseignement du japonais — à confirmer", "Certification de langue japonaise — à confirmer"], specializations: ["Hiragana, katakana et kanji", "Préparation JLPT N5/N4", "Culture et usages japonais"] },
    ar: { name: "كريم آيت العربي", title: "مدرس اللغة والثقافة اليابانية", bio: "ملف افتراضي لمدرس جزائري في الجزائر العاصمة. تجمع دروسه النموذجية بين أساسيات اليابانية والثقافة وآداب الحياة اليومية.", qualifications: ["مؤهل تدريس اليابانية — يحتاج إلى تأكيد", "شهادة لغة يابانية — تحتاج إلى تأكيد"], specializations: ["الهيراغانا والكاتاكانا والكانجي", "التحضير لـ JLPT N5/N4", "الثقافة والآداب اليابانية"] },
  },
};

const languages: Record<string, Record<Language, string>> = {
  French: { fr: "Français", ar: "الفرنسية" },
  German: { fr: "Allemand", ar: "الألمانية" },
  Spanish: { fr: "Espagnol", ar: "الإسبانية" },
  "Mandarin Chinese": { fr: "Chinois mandarin", ar: "الصينية الماندرين" },
  English: { fr: "Anglais", ar: "الإنجليزية" },
  Japanese: { fr: "Japonais", ar: "اليابانية" },
};

const durations: Record<string, Record<Language, string>> = {
  "3 months": { fr: "3 mois", ar: "3 أشهر" },
  "4 months": { fr: "4 mois", ar: "4 أشهر" },
  "5 months": { fr: "5 mois", ar: "5 أشهر" },
  "6 months": { fr: "6 mois", ar: "6 أشهر" },
  "7 months": { fr: "7 mois", ar: "7 أشهر" },
  "8 months": { fr: "8 mois", ar: "8 أشهر" },
  "60 min": { fr: "60 min", ar: "60 دقيقة" },
  "90 min": { fr: "90 min", ar: "90 دقيقة" },
  "120 min": { fr: "120 min", ar: "120 دقيقة" },
};

const weekdays: Record<string, Record<Language, string>> = {
  Sun: { fr: "dim.", ar: "الأحد" },
  Mon: { fr: "lun.", ar: "الإثنين" },
  Tue: { fr: "mar.", ar: "الثلاثاء" },
  Wed: { fr: "mer.", ar: "الأربعاء" },
  Thu: { fr: "jeu.", ar: "الخميس" },
  Fri: { fr: "ven.", ar: "الجمعة" },
  Sat: { fr: "sam.", ar: "السبت" },
};
const months: Record<string, Record<Language, string>> = {
  November: { fr: "novembre", ar: "نوفمبر" },
};

export function localizeCourse(course: Course, language: Language): Course {
  const copy = courseCopy[course.id]?.[language];
  if (!copy) return course;
  return {
    ...course,
    title: copy.title,
    description: copy.description,
    language: copy.language,
    learningObjectives: copy.objectives,
    prerequisites: course.prerequisites.length ? [copy.prerequisite] : [],
    duration: durations[course.duration]?.[language] ?? course.duration,
    sessionDuration: durations[course.sessionDuration]?.[language] ?? course.sessionDuration,
    days: course.days
      .split(", ")
      .map((day) => weekdays[day]?.[language] ?? day)
      .join(language === "fr" ? ", " : "، "),
    startDate: course.startDate.replace(
      /November/g,
      months.November[language],
    ),
    price: course.priceDZD,
    instructor: {
      ...course.instructor,
      ...instructorCopy[course.instructorId][language],
    },
  };
}

export function localizeInstructor(instructor: InstructorProfile, language: Language): InstructorProfile {
  const copy = instructorCopy[instructor.id]?.[language];
  if (!copy) return instructor;
  return { ...instructor, ...copy };
}

export function localizedLanguageName(value: string, language: Language) {
  return languages[value]?.[language] ?? value;
}
