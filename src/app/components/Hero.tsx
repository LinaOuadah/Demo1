import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Users, Layers3 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";
import { courses } from "../data/courses";
import { useLanguage } from "../i18n/LanguageContext";

const languagesCount = new Set(courses.map((course) => course.language)).size;
const formatsCount = new Set(courses.map((course) => course.studyType)).size;
const courseCount = courses.length;

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-8 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)] items-center gap-3 sm:grid-cols-2 sm:gap-8 lg:gap-12">
          {/* Content */}
          <div className="min-w-0 space-y-4 sm:space-y-7">
            <div className="space-y-2 sm:space-y-4">
              <p className="text-[0.62rem] font-semibold tracking-[0.1em] text-primary sm:text-sm sm:tracking-[0.18em]">
                {t("EUROBRIDGE · ALGIERS, ALGERIA")}
              </p>
              <h1 className="text-[clamp(1.25rem,5.2vw,1.75rem)] font-bold leading-[1.12] text-gray-900 sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl">
                {t("Discover a New Language.")}{" "}
                <span className="text-primary">{t("Discover New Possibilities.")}</span>
              </h1>
              <p className="text-xs leading-relaxed text-gray-600 sm:max-w-xl sm:text-lg">
                {t("Build your confidence and connect with the world through language. Find a course that fits your interests and goals.")}
              </p>
              <p className="hidden text-gray-600 sm:block sm:max-w-xl">
                {t("Whether you are learning for study, work, or personal growth, EuroBridge is here to support your journey.")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-4">
              <Link to="/courses">
                <Button size="sm" className="h-9 px-3 text-xs sm:h-11 sm:px-4 sm:text-sm lg:h-12 lg:px-6">
                  {t("Explore Courses")}
                  <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link to="/#contact">
                <Button size="sm" variant="outline" className="h-9 border-primary px-3 text-xs text-primary hover:bg-primary hover:text-white sm:h-11 sm:px-4 sm:text-sm lg:h-12 lg:px-6">
                  {t("Get in Touch")}
                </Button>
              </Link>
            </div>

          </div>

          {/* Hero Image */}
          <div className="relative min-w-0">
            <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-2xl sm:aspect-[4/3] sm:rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt={t("Learners collaborating in a language class")}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating cards */}
            <div className="site-card absolute -bottom-2 -left-2 hidden rounded-lg border bg-white p-2 shadow-lg sm:-bottom-4 sm:-left-4 sm:block sm:p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t("Learn with purpose")}</div>
                  <div className="text-xs text-gray-600">{t("Build skills for your goals")}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-primary/10 pt-4 sm:mt-8 sm:gap-5 sm:pt-6 lg:gap-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-full bg-primary/10 p-2 sm:p-3">
              <BookOpen className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-gray-900 sm:text-2xl">{courseCount}</div>
              <div className="text-[0.65rem] leading-tight text-gray-600 sm:text-sm">{t("Courses Available")}</div>
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-full bg-primary/10 p-2 sm:p-3">
              <Users className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-gray-900 sm:text-2xl">{languagesCount}</div>
              <div className="text-[0.65rem] leading-tight text-gray-600 sm:text-sm">{t("Languages")}</div>
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-full bg-primary/10 p-2 sm:p-3">
              <Layers3 className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-gray-900 sm:text-2xl">{formatsCount}</div>
              <div className="text-[0.65rem] leading-tight text-gray-600 sm:text-sm">{t("Study Formats")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}