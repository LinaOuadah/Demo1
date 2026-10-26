import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { instructors as instructorProfiles } from "../data/instructors";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeInstructor } from "../i18n/localizedData";

const featuredInstructorIds = [5, 1, 2];
const instructors = featuredInstructorIds.map((id) => {
  const instructor = instructorProfiles.find((profile) => profile.id === id);
  if (!instructor) {
    throw new Error(`Featured instructor ${id} is missing from the instructor catalogue.`);
  }
  return {
    ...instructor,
    imageAlt: `Representative stock portrait for fictional Algerian instructor ${instructor.name}`,
  };
});

export function FeaturedInstructors() {
  const { t, language } = useLanguage();
  return (
    <section id="instructors" className="scroll-mt-24 bg-muted py-12 sm:scroll-mt-28 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-9 text-center sm:mb-12">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary mb-3">
            {t("MEET THE TEAM")}
          </p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            {t("Our Instructors")}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            {t("Meet our fictional Algerian instructor profiles based in Algiers.")}
          </p>
          <p className="text-xs text-gray-500 mt-3">
            {t("Portraits are representative stock photos. Replace these profiles with approved local staff details and photographs before publication.")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {instructors.map((rawInstructor) => {
            const instructor = localizeInstructor(rawInstructor, language);
            return (
            <Card
              key={instructor.name}
              className="mx-auto w-full max-w-sm items-center gap-0 overflow-hidden border-slate-200 bg-white p-4 text-center shadow-sm sm:max-w-none sm:p-6"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md sm:h-28 sm:w-28">
                <ImageWithFallback
                  src={instructor.image}
                  alt={instructor.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute -bottom-0.5 -right-1 rounded-full border-2 border-white bg-white text-xs leading-none" aria-label={t("Algerian profile")}>
                  🇩🇿
                </span>
              </div>
              <CardContent className="w-full p-0 pt-4 text-center [&:last-child]:pb-0">
                <h3 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg">
                  {instructor.name}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {instructor.title}
                </p>
              </CardContent>
            </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/instructors">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              {t("Meet All Instructors")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
