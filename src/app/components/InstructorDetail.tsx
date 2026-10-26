import { Link, useParams } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  ChevronLeft,
  Award,
  Clock,
  BookOpen,
  Star,
  Users,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { instructors } from "../data/instructors";
import { courses } from "../data/courses";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeCourse, localizeInstructor, localizedLanguageName } from "../i18n/localizedData";

export function InstructorDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const rawInstructor = instructors.find((i) => i.id === Number(id));
  const instructor = rawInstructor ? localizeInstructor(rawInstructor, language) : undefined;

  if (!instructor) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center justify-center px-4">
        <AlertCircle className="w-16 h-16 text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("Instructor Not Found")}</h1>
        <p className="text-gray-500 mb-8 text-center">
          {t("The instructor profile you are looking for does not exist or may have been removed.")}
        </p>
        <Link to="/instructors">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {t("Browse All Instructors")}
          </Button>
        </Link>
      </div>
    );
  }

  const instructorCourses = courses
    .filter((c) => c.instructorId === instructor.id)
    .map((course) => localizeCourse(course, language));

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Page Header */}
      <div className="bg-primary py-10 text-primary-foreground sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/instructors"
            className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("Back to Instructors")}
          </Link>

          {/* Hero: avatar + name block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white/30 bg-white/20 sm:h-24 sm:w-24">
              <ImageWithFallback
                src={instructor.image}
                alt={`${t("Representative stock portrait for fictional Algerian instructor")} ${instructor.name}`}
                className="h-full w-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-1 rounded-full border-2 border-white bg-white text-xs leading-none" aria-label={t("Algerian profile")}>
                🇩🇿
              </span>
            </div>
            <div>
              <h1 className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl">{instructor.name}</h1>
              <p className="text-base text-primary-foreground/80 sm:text-lg">{instructor.title}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-primary-foreground/70 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {t("Experience:")} {instructor.experience}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {instructorCourses.length} {t(instructorCourses.length === 1 ? "course" : "courses")} {t("taught")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-10">

          {/* ── Left / Main ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Biography */}
            <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">{t("Biography")}</h2>
              <p className="text-gray-600 leading-relaxed">{instructor.bio}</p>
            </div>

            {/* Qualifications */}
            <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
                <Award className="w-5 h-5 text-primary" />
                {t("Qualifications")}
              </h2>
              {instructor.qualifications.length === 0 ? (
                <p className="text-gray-500 text-sm">{t("No qualifications listed.")}</p>
              ) : (
                <ul className="space-y-3">
                  {instructor.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <span className="text-gray-700">{q}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Specializations */}
            <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
                <Lightbulb className="w-5 h-5 text-primary" />
                {t("Areas of Expertise")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {instructor.specializations.map((s) => (
                  <span
                    key={s}
                    className="bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Courses taught */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                {t("Courses by")} {instructor.name.split(" ")[0]}
              </h2>

              {instructorCourses.length === 0 ? (
                <div className="site-card bg-white rounded-xl border border-gray-100 p-8 shadow-sm text-center">
                  <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {t("No courses are currently associated with this instructor.")}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  {instructorCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="site-card group overflow-hidden"
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <ImageWithFallback
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary text-xs"
                          >
                            {t(course.level)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs text-primary font-medium mb-3">{course.language}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {course.students}
                            </span>
                            <span>{course.duration}</span>
                          </div>
                          <span className="font-bold text-gray-900 text-sm">{course.priceDZD}</span>
                        </div>
                        <Link to={`/courses/${course.id}`} className="block mt-4">
                          <Button
                            size="sm"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            {t("View Course")}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right / Sidebar ──────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-5">

              {/* Languages taught */}
              <div className="site-card bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">{t("Languages Taught")}</h3>
                <div className="flex flex-wrap gap-2">
                  {instructor.languages.map((lang) => (
                    <Badge
                      key={lang}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {localizedLanguageName(lang, language)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="site-card bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">{t("At a Glance")}</h3>
                <dl className="space-y-4">
                  {[
                    { term: t("Experience"), detail: instructor.experience },
                    {
                      term: t("Courses"),
                      detail: `${instructorCourses.length} ${t(instructorCourses.length === 1 ? "active course" : "active courses")}`,
                    },
                    {
                      term: t("Total students"),
                      detail: instructorCourses
                        .reduce((sum, c) => sum + c.students, 0)
                        .toLocaleString(),
                    },
                    {
                      term: t("Avg. rating"),
                      detail:
                        instructorCourses.length > 0
                          ? (
                              instructorCourses.reduce((sum, c) => sum + c.rating, 0) /
                              instructorCourses.length
                            ).toFixed(1)
                          : "—",
                    },
                  ].map(({ term, detail }) => (
                    <div key={term} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                        {term}
                      </dt>
                      <dd className="font-semibold text-gray-900">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Browse all instructors */}
              <Link to="/instructors">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {t("Browse All Instructors")}
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
