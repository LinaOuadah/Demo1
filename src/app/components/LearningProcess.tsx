import { BadgeCheck, BookOpenCheck, Compass, MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "../i18n/LanguageContext";

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Discover Your Level",
    description:
      "Start with a placement assessment to understand your current abilities and find a suitable starting point.",
  },
  {
    number: "02",
    icon: BookOpenCheck,
    title: "Find Your Perfect Fit",
    description:
      "Choose a course that matches your goals, schedule, and preferred learning format.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Learn Through Practice",
    description:
      "Build your skills through guided lessons, practical exercises, conversation, and regular feedback.",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Progress with Confidence",
    description:
      "Review your achievements, assess your progress, and prepare for your next learning goal.",
  },
];

export function LearningProcess() {
  const { t } = useLanguage();
  return (
    <section id="process" className="scroll-mt-24 bg-white py-12 sm:scroll-mt-28 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-9 text-center sm:mb-12">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary mb-3">
            {t("YOUR JOURNEY, STEP BY STEP")}
          </p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            {t("Our Learning Process")}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            {t("A clear path to help you choose a course, build your skills, and progress with confidence.")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <Card key={number} className="site-card h-full">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-bold tracking-widest text-primary/60">
                    {t("STEP")} {number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t(title)}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t(description)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
