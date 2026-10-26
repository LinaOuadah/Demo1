import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft } from "lucide-react";
import { instructors } from "../data/instructors";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeInstructor } from "../i18n/localizedData";

function InstructorCard({ instructor }: { instructor: (typeof instructors)[0] }) {
  const { t, language } = useLanguage();
  const localized = localizeInstructor(instructor, language);
  return (
    <Card className="mx-auto w-full max-w-sm items-center gap-0 overflow-hidden border-slate-200 bg-white p-4 text-center shadow-sm sm:max-w-none sm:p-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-primary/10 shadow-md sm:h-28 sm:w-28">
        <ImageWithFallback
          src={instructor.image}
          alt={`${t("Representative stock portrait for fictional Algerian instructor")} ${localized.name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute -bottom-0.5 -right-1 rounded-full border-2 border-white bg-white text-xs leading-none" aria-label={t("Algerian profile")}>
          🇩🇿
        </span>
      </div>
      <CardContent className="w-full p-0 pt-4 text-center [&:last-child]:pb-0">
        <h3 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg">
          {localized.name}
        </h3>
        <p className="mb-4 text-xs font-medium text-primary sm:mb-5 sm:text-sm">
          {localized.title}
        </p>
        <Link to={`/instructors/${instructor.id}`} className="block">
          <Button
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {t("View Profile")}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export function Instructors() {
  const { t } = useLanguage();
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
          <h1 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">{t("Our Instructors")}</h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            {t("Browse fictional Algerian instructor profiles based in Algiers.")}
          </p>
          <p className="text-primary-foreground/70 text-sm mt-3">
            {t("Names, bios, qualifications, and portraits are sample content. Replace with approved local staff details and photographs before publication.")}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-sm text-gray-500 mb-8">
          <span className="font-semibold text-gray-900">{instructors.length}</span> {t("instructors")}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </div>
  );
}
