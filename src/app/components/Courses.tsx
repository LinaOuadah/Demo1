import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { courses } from "../data/courses";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeCourse } from "../i18n/localizedData";

export function Courses() {
  const featured = courses.slice(0, 3);
  const { t, language } = useLanguage();

  return (
    <section id="courses" className="scroll-mt-24 bg-muted py-12 sm:scroll-mt-28 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary mb-3">
            {t("OUR COURSES")}
          </p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            {t("Explore Our Language Courses")}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            {t("Explore sample language programmes from EuroBridge in Algiers, Algeria.")}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {featured.map((rawCourse) => {
            const course = localizeCourse(rawCourse, language);
            return (
            <Card key={course.id} className="group mx-auto w-full max-w-md overflow-hidden sm:max-w-none">
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
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  {course.title}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">{course.language}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                  <Clock className="w-4 h-4" />
                  <span>                  {t("Duration:")} {course.duration}</span>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <Link
                    to={`/contact?workflow=registration&courseId=${course.id}#contact`}
                    className="min-w-0 flex-1"
                  >
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      {t("Enroll Now")}
                    </Button>
                  </Link>
                  <Link to={`/courses/${course.id}`} className="min-w-0 flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      {t("Details")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/courses">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
              {t("View All Courses")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
