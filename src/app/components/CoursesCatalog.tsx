import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Clock,
  Users,
  Star,
  Monitor,
  MapPin,
  BookOpen,
  ChevronLeft,
  Search,
  X,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { courses, type Level, type StudyType } from "../data/courses";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeCourse, localizedLanguageName } from "../i18n/localizedData";

// ─── Static filter options ────────────────────────────────────────────────────

const LEVELS: ("All" | Level)[] = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];
const STUDY_TYPES: ("All" | StudyType)[] = ["All", "Online", "In-person", "Both"];
const LANGUAGES = ["All", ...Array.from(new Set(courses.map((c) => c.language))).sort()];

// ─── Small helpers ────────────────────────────────────────────────────────────

function StudyTypeBadge({ type, t }: { type: StudyType; t: (text: string) => string }) {
  const icon =
    type === "Online" ? (
      <Monitor className="w-3 h-3" />
    ) : type === "In-person" ? (
      <MapPin className="w-3 h-3" />
    ) : (
      <BookOpen className="w-3 h-3" />
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500">
      {icon}
      {t(type)}
    </span>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function ActiveChip({ label, onRemove, t }: { label: string; onRemove: () => void; t: (text: string) => string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        aria-label={`${t("Remove filter:")} ${label}`}
        className="hover:text-primary/60 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CoursesCatalog() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState<"All" | Level>("All");
  const [selectedStudyType, setSelectedStudyType] = useState<"All" | StudyType>("All");

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedLanguage !== "All" ||
    selectedLevel !== "All" ||
    selectedStudyType !== "All";

  function clearAll() {
    setSearchQuery("");
    setSelectedLanguage("All");
    setSelectedLevel("All");
    setSelectedStudyType("All");
  }

  // Active chips (one per applied filter, in order)
  const activeChips = [
    searchQuery.trim()
      ? { label: `"${searchQuery.trim()}"`, onRemove: () => setSearchQuery("") }
      : null,
    selectedLanguage !== "All"
      ? { label: localizedLanguageName(selectedLanguage, language), onRemove: () => setSelectedLanguage("All") }
      : null,
    selectedLevel !== "All"
      ? { label: t(selectedLevel), onRemove: () => setSelectedLevel("All") }
      : null,
    selectedStudyType !== "All"
      ? { label: t(selectedStudyType), onRemove: () => setSelectedStudyType("All") }
      : null,
  ].filter((c): c is { label: string; onRemove: () => void } => c !== null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return courses.filter((c) => {
      const searchMatch =
        !q ||
        localizeCourse(c, language).title.toLowerCase().includes(q) ||
        localizedLanguageName(c.language, language).toLowerCase().includes(q);
      const langMatch = selectedLanguage === "All" || c.language === selectedLanguage;
      const levelMatch = selectedLevel === "All" || c.level === selectedLevel;
      const typeMatch = selectedStudyType === "All" || c.studyType === selectedStudyType;
      return searchMatch && langMatch && levelMatch && typeMatch;
    });
  }, [searchQuery, selectedLanguage, selectedLevel, selectedStudyType, language]);

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Page Header */}
      <div className="bg-primary py-10 text-primary-foreground sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("Back to Home")}
          </Link>
          <h1 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">{t("All Courses")}</h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            {t("Browse sample language programmes offered by EuroBridge in Algiers, Algeria.")}
          </p>
          <p className="text-primary-foreground/70 text-sm mt-3">
            {t("Course details, ratings, prices, and seat counts are demo data and should be confirmed.")}
          </p>
        </div>
      </div>

      {/* Sticky search + filters bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

          {/* Search row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("Search by course name or language…")}
                aria-label={t("Search courses")}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label={t("Clear search")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs font-medium text-gray-500 hover:text-primary transition-colors whitespace-nowrap underline underline-offset-2"
              >
                {t("Clear all")}
              </button>
            )}
          </div>

          {/* Language filter */}
          <div className="flex flex-wrap items-center gap-2 pb-1 sm:gap-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0">
              {t("Language")}
            </span>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <FilterPill
                  key={lang}
                  label={lang === "All" ? t(lang) : localizedLanguageName(lang, language)}
                  active={selectedLanguage === lang}
                  onClick={() => setSelectedLanguage(lang)}
                />
              ))}
            </div>
          </div>

          {/* Level + Format filters */}
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0">
                {t("Level")}
              </span>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((lvl) => (
                  <FilterPill
                    key={lvl}
                    label={t(lvl)}
                    active={selectedLevel === lvl}
                    onClick={() => setSelectedLevel(lvl as "All" | Level)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0">
                {t("Format")}
              </span>
              <div className="flex flex-wrap gap-2">
                {STUDY_TYPES.map((type) => (
                  <FilterPill
                    key={type}
                    label={t(type)}
                    active={selectedStudyType === type}
                    onClick={() => setSelectedStudyType(type as "All" | StudyType)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs text-gray-400">{t("Active:")}</span>
              {activeChips.map((chip) => (
                <ActiveChip key={chip.label} label={chip.label} onRemove={chip.onRemove} t={t} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Courses grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("No courses found")}</h3>
            <p className="text-gray-500 mb-6">
              {t("No courses match your search or filters. Try changing your keywords or selections.")}
            </p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={clearAll}
            >
              {t("Clear all filters")}
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-8">
              {t("Showing")}{" "}
              <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
              {language === "ar" ? " دورة" : filtered.length !== 1 ? " cours" : " cours"}
              {hasActiveFilters && (
                <span className="text-gray-400"> {t("matching your search")}</span>
              )}
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {filtered.map((rawCourse) => {
                const course = localizeCourse(rawCourse, language);
                return (
                <Card
                  key={course.id}
                  className="group mx-auto w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl sm:max-w-none"
                >
                  <div className="aspect-[16/9] overflow-hidden sm:aspect-[16/10]">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {t(course.level)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="mb-1 text-lg font-semibold text-gray-900 sm:text-xl">{course.title}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{course.language}</p>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>                        {course.students} {t("students")}</span>
                      </div>
                      <StudyTypeBadge type={course.studyType} t={t} />
                    </div>

                    <div className="mb-4 text-2xl font-bold text-gray-900">
                      {course.priceDZD}
                    </div>
                    <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:gap-3">
                      <Link to={`/courses/${course.id}`}>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          {t("View Details")}
                        </Button>
                      </Link>
                      <Link to={`/contact?workflow=registration&courseId=${course.id}#contact`}>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          {t("Enroll Now")}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
