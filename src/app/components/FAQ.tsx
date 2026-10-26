import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search,
  X,
  MessageCircle,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "../i18n/LanguageContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = "All" | "Registration" | "Courses" | "Pricing" | "Schedules";

interface FAQItem {
  id: string;
  category: Exclude<Category, "All">;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "reg-1",
    category: "Registration",
    question: "How do I register for a course?",
    answer:
      "Open a course details page and click \"Register Now\" to see the demo registration form. The form does not send or store your information and does not reserve a place. Contact us using the details in the Contact section to ask about actual availability and payment arrangements.",
  },
  {
    id: "reg-2",
    category: "Registration",
    question: "Can I visit in person to register?",
    answer:
      "Algiers, Algeria is shown as a sample location. The institute's exact address and office hours are unconfirmed; please contact us before planning a visit.",
  },
  {
    id: "reg-3",
    category: "Registration",
    question: "What information do I need to provide when registering?",
    answer:
      "The demo form asks for your first and last name, phone number, email address, selected course, preferred learning format and schedule, and consent. It does not ask for your proficiency level or transmit/store your information.",
  },
  {
    id: "courses-1",
    category: "Courses",
    question: "Which languages does EuroBridge currently offer?",
    answer:
      "The demo catalogue lists six languages: French, German, Spanish, Mandarin Chinese, English, and Japanese. Visit the Courses Catalogue for the current mock course records, levels, schedules, and listed availability.",
  },
  {
    id: "courses-2",
    category: "Courses",
    question: "What proficiency levels are available?",
    answer:
      "The demo catalogue uses Beginner, Intermediate, Advanced, and All Levels labels. Each course page shows its current listed level; not every level is available for each language.",
  },
  {
    id: "courses-3",
    category: "Courses",
    question: "Are online or hybrid learning options available?",
    answer:
      "The demo catalogue lists courses as Online, In-person, or Both. Check each course page for its listed format; other arrangements have not been confirmed.",
  },
  {
    id: "courses-4",
    category: "Courses",
    question: "How long do courses typically run?",
    answer:
      "The current demo course records list durations from 3 to 8 months. Each course page shows its listed duration, sessions per week, and session length.",
  },
  {
    id: "pricing-1",
    category: "Pricing",
    question: "How much do courses cost?",
    answer:
      "Prices vary by course. The sample catalogue shows fees in Algerian dinars (DZD); confirm current prices and payment terms with us by email before enrolling.",
  },
  {
    id: "pricing-2",
    category: "Pricing",
    question: "Are there group discounts or special offers?",
    answer:
      "No discounts or special offers are listed in the current demo catalogue. Contact us to ask whether any offers are available; none are confirmed here.",
  },
  {
    id: "schedules-1",
    category: "Schedules",
    question: "When do new courses start?",
    answer:
      "Each course page lists its current demo start date. Dates and seat counts are not live bookings, so contact us to confirm current availability.",
  },
  {
    id: "schedules-2",
    category: "Schedules",
    question: "Can I change my course or schedule after registering?",
    answer:
      "The website does not process registrations or schedule changes. Contact us to ask about changing a course or schedule; availability has not been confirmed.",
  },
  {
    id: "schedules-3",
    category: "Schedules",
    question: "How many sessions per week are required?",
    answer:
      "The demo course records list 2 to 4 sessions per week, with session lengths from 60 to 120 minutes. Check each course page for its listed days and times.",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Registration",
  "Courses",
  "Pricing",
  "Schedules",
];

const CATEGORY_BADGE: Record<Exclude<Category, "All">, string> = {
  Registration: "bg-slate-100 text-slate-700 border-slate-200",
  Courses: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pricing: "bg-amber-50 text-amber-700 border-amber-200",
  Schedules: "bg-violet-50 text-violet-700 border-violet-200",
};

// ─── FilterPill ───────────────────────────────────────────────────────────────

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
      className={cn(
        "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
      )}
    >
      {label}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function FAQ({ limit }: { limit?: number }) {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  const hasActiveFilters = search.trim() !== "" || activeCategory !== "All";
  const visibleQuestions = limit ? filtered.slice(0, limit) : filtered;

  function clearAll() {
    setSearch("");
    setActiveCategory("All");
  }

  const groupedCategories: Exclude<Category, "All">[] = [
    "Registration",
    "Courses",
    "Pricing",
    "Schedules",
  ];

  if (limit) {
    return (
      <section id="faq" className="scroll-mt-24 bg-muted py-12 sm:scroll-mt-28 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-9 text-center sm:mb-12">
            <p className="text-sm font-semibold tracking-[0.18em] text-primary mb-3">
              {t("QUICK ANSWERS")}
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              {t("Frequently Asked Questions")}
            </h2>
          </div>

          <Accordion type="multiple" className="grid items-start md:grid-cols-2 gap-6">
            {visibleQuestions.map((item) => (
              <Card
                key={item.id}
                className="group hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <AccordionItem value={item.id} className="border-0">
                  <CardContent className="p-0">
                    <AccordionTrigger className="px-6 py-5 text-left text-base font-semibold text-gray-900 hover:no-underline group-hover:text-primary">
                      {t(item.question)}
                    </AccordionTrigger>
                    <AccordionContent className="px-6">
                      <p className="text-sm text-gray-600 leading-relaxed pb-2">
                        {t(item.answer)}
                      </p>
                    </AccordionContent>
                  </CardContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-muted py-12 sm:scroll-mt-28 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-9 text-center sm:mb-12">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary mb-3">
            {t("NEED TO KNOW MORE?")}
          </p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            {t("Your Questions, Answered")}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            {t("Quick answers about courses, registration, pricing, and schedules.")}
          </p>
        </div>

        <div className="mb-8 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={t(cat)}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
          <div className="relative w-full sm:w-72 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder={t("Search questions...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary placeholder-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={t("Clear search")}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          {visibleQuestions.length === 0
            ? t("No questions found")
            : limit && filtered.length > limit
              ? language === "ar"
                ? `عرض ${visibleQuestions.length} من ${filtered.length} إجابات`
                : `Affichage de ${visibleQuestions.length} sur ${filtered.length} réponses`
              : language === "ar"
                ? `${visibleQuestions.length} إجابات مفيدة`
                : `${visibleQuestions.length} réponse${visibleQuestions.length === 1 ? "" : "s"} utile${visibleQuestions.length === 1 ? "" : "s"}`}
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="ml-2 text-primary hover:underline font-medium"
            >
              {t("Clear filters")}
            </button>
          )}
        </p>

        {visibleQuestions.length === 0 ? (
          <Card className="text-center">
            <CardContent className="p-10">
              <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("No matching questions")}
              </h3>
              <p className="text-gray-500 mb-5">
                {t("Try another search or ask us directly.")}
              </p>
              <Link to="/#contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("Contact Us")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {groupedCategories.map((cat) => {
              const items = visibleQuestions.filter((item) => item.category === cat);
              if (!items.length) return null;

              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold border",
                        CATEGORY_BADGE[cat]
                      )}
                    >
                      {t(cat)}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    {items.map((item) => (
                      <Card
                        key={item.id}
                        className="hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <Accordion type="single" collapsible>
                            <AccordionItem value={item.id} className="border-0">
                              <AccordionTrigger className="px-6 py-5 text-left text-base font-semibold text-gray-900 hover:no-underline hover:text-primary">
                                {t(item.question)}
                              </AccordionTrigger>
                              <AccordionContent className="px-6">
                                <p className="text-gray-600 leading-relaxed pb-2 text-sm">
                                  {t(item.answer)}
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Card className="mt-10">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {t("Still have a question?")}
              </h3>
              <p className="text-sm text-gray-500">
                {t("Our team is happy to help.")}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/courses">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t("Browse Courses")}
                </Button>
              </Link>
              <Link to="/#contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("Contact Us")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
