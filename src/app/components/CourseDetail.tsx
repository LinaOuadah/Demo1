import { Link, useParams } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Clock,
  Users,
  Star,
  Monitor,
  MapPin,
  BookOpen,
  ChevronLeft,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  LayersIcon,
} from "lucide-react";

import { courses, type StudyType } from "../data/courses";
import { SITE_EMAIL, SITE_PHONE } from "../data/siteDetails";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeCourse } from "../i18n/localizedData";

function StudyTypeIcon({ type }: { type: StudyType }) {
  if (type === "Online") return <Monitor className="w-5 h-5" />;
  if (type === "In-person") return <MapPin className="w-5 h-5" />;
  return <BookOpen className="w-5 h-5" />;
}

function SeatsIndicator({ available, total, t }: { available: number; total: number; t: (text: string) => string }) {
  const pct = (available / total) * 100;
  const color = pct <= 25 ? "bg-red-400" : pct <= 50 ? "bg-yellow-400" : "bg-green-400";
  const label =
    available === 0
      ? "Fully Booked"
      : available <= 3
      ? `${t("Only")} ${available} ${t("seats left!")}`
      : `${available} ${t("seats available")}`;

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span className="font-medium text-gray-700">{label}</span>
        <span>{available}/{total}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${(available / total) * 100}%` }}
        />
      </div>
    </div>
  );
}


export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const rawCourse = courses.find((c) => c.id === Number(id));
  const course = rawCourse ? localizeCourse(rawCourse, language) : undefined;

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center justify-center px-4">
        <AlertCircle className="w-16 h-16 text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("Course Not Found")}</h1>
        <p className="text-gray-500 mb-8 text-center">
          {t("The course you are looking for does not exist or may have been removed.")}
        </p>
        <Link to="/courses">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {t("Browse All Courses")}
          </Button>
        </Link>
      </div>
    );
  }

  const seatsLow = course.seatsAvailable > 0 && course.seatsAvailable <= 5;
  const seatsFull = course.seatsAvailable === 0;

  return (
    <>
      <div className="min-h-screen bg-[#F7FAFC]">
        {/* Hero Banner */}
        <div className="relative h-64 w-full overflow-hidden sm:h-72 md:h-96">
          <ImageWithFallback
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl mx-auto w-full">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {t("Back to Courses")}
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0">
                {t(course.level)}
              </Badge>
              <span className="text-white/80 text-sm font-medium">{course.language}</span>
              {seatsLow && (
                <span className="inline-flex items-center gap-1 text-xs bg-yellow-400/90 text-yellow-900 px-2 py-0.5 rounded-full font-medium">
                  <AlertCircle className="w-3 h-3" /> {t("Limited seats")}
                </span>
              )}
              {seatsFull && (
                <span className="inline-flex items-center gap-1 text-xs bg-red-400/90 text-white px-2 py-0.5 rounded-full font-medium">
                  {t("Fully Booked")}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">{course.title}</h1>
          </div>
        </div>

        {/* Page Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-sm text-gray-500 mb-6">
          {t("Course details, ratings, prices, and availability are demo data; contact us to confirm them.")}
        </p>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-10">

            {/* ── Left / Main ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {[
                  {
                    icon: <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />,
                    label: t("Rating"),
                    value: `${course.rating} / 5`,
                  },
                  {
                    icon: <Users className="w-5 h-5 text-primary" />,
                    label: t("Students"),
                    value: String(course.students),
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-primary" />,
                    label: t("Duration"),
                    value: course.duration,
                  },
                  {
                    icon: <StudyTypeIcon type={course.studyType} />,
                    label: t("Format"),
                    value: t(course.studyType),
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="site-card bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center shadow-sm"
                  >
                    <div className="mb-2 text-primary">{icon}</div>
                    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* About */}
              <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">{t("About This Course")}</h2>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>

              {/* Learning Objectives */}
              <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  {t("Learning Objectives")}
                </h2>
                <ul className="space-y-3">
                  {course.learningObjectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
                  <LayersIcon className="w-5 h-5 text-primary" />
                  {t("Prerequisites")}
                </h2>
                {course.prerequisites.length === 0 ? (
                  <p className="text-gray-600">
                    {t("No prior knowledge required — this course is open to complete beginners.")}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {course.prerequisites.map((req) => (
                      <li key={req} className="flex items-start gap-3 text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Schedule & Format */}
              <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">{t("Schedule & Format")}</h2>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-6">
                  {[
                    { term: t("Duration"), detail: course.duration },
                    { term: t("Sessions / Week"), detail: `${course.sessionsPerWeek} ${t("sessions")}` },
                    { term: t("Session Length"), detail: course.sessionDuration },
                    { term: t("Days"), detail: course.days || t("To be confirmed") },
                    { term: t("Session Time"), detail: course.sessionTime || t("To be confirmed") },
                    { term: t("Study Format"), detail: t(course.studyType) },
                    { term: t("Start Date"), detail: course.startDate },
                    { term: t("Language"), detail: course.language },
                  ].map(({ term, detail }) => (
                    <div key={term} className="border-b border-gray-50 pb-4">
                      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        {term}
                      </dt>
                      <dd className="text-gray-900 font-medium">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Instructor */}
              <div className="site-card rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">{t("Your Instructor")}</h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{course.instructor.name}</p>
                    <p className="text-sm text-primary mb-3">{course.instructor.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right / Sidebar ──────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="site-card bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden lg:sticky lg:top-6">

                {/* Price Block */}
                <div className="bg-primary/5 px-5 py-4 border-b border-gray-100 sm:px-6 sm:py-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t("Tuition Fee")}</p>
                  <p className="text-3xl font-bold text-gray-900">{course.priceDZD}</p>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  {/* Start Date */}
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">{t("Next intake starts")}</p>
                      <p className="font-semibold text-gray-900">{course.startDate}</p>
                    </div>
                  </div>

                  {/* Seats */}
                  <SeatsIndicator available={course.seatsAvailable} total={course.totalSeats} t={t} />

                  {/* CTA Buttons */}
                  <Link
                    to={`/contact?workflow=registration&courseId=${course.id}#contact`}
                    aria-disabled={seatsFull}
                    onClick={(event) => {
                      if (seatsFull) event.preventDefault();
                    }}
                    className={seatsFull ? "pointer-events-none" : "block"}
                  >
                    <Button
                      className="w-full bg-primary py-6 text-base text-primary-foreground hover:bg-primary/90"
                      disabled={seatsFull}
                    >
                      {seatsFull ? t("Fully Booked") : t("Enroll Now")}
                    </Button>
                  </Link>

                  <Link to="/#contact" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {t("Request More Info")}
                    </Button>
                  </Link>

                  <p className="text-xs text-gray-400 text-center">
                    {t("Questions? Contact us before enrolling.")}
                  </p>

                  {/* Contact Details */}
                  <div className="pt-2 space-y-3 border-t border-gray-50">
                    <div
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      {SITE_PHONE}
                    </div>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      {SITE_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}
