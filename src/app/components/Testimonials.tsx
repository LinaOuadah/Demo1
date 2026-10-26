import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

const reviews = [
  {
    name: "Lina Boudiaf",
    course: "English Course Student",
    quote:
      "The lessons are engaging, and I feel much more confident speaking English. The instructors explain everything clearly and make learning enjoyable.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.MIBUn8DGzxmxqrJqTzqupwHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageAlt: "Representative portrait for fictional Algerian English student Lina Boudiaf",
  },
  {
    name: "Yacine Merabet",
    course: "French Course Student",
    quote:
      "I joined to improve my French, and the structured lessons have helped me make steady progress. I especially enjoy the conversation activities.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    imageAlt: "Representative portrait for fictional Algerian French student Yacine Merabet",
  },
  {
    name: "Amira Kaci",
    course: "German Course Student",
    quote:
      "Learning German seemed difficult at first, but the lessons are well organized and easy to follow. I now feel more comfortable using the language.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/048/764/734/small_2x/smiling-young-male-teacher-with-western-european-features-in-a-classroom-education-and-learning-stock-photo.jpg",
    imageAlt: "Representative portrait for fictional Algerian German student Amira Kaci",
  },
];

export function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="scroll-mt-24 bg-muted py-12 sm:scroll-mt-28 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-9 text-center sm:mb-12">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary mb-3">
            {t("STUDENT REVIEWS")}
          </p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            {t("Student Reviews")}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            {t("Fictional Algerian student names and sample reviews with representative stock portraits. Replace them with approved local feedback and photos.")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {reviews.map((review) => (
            <Card key={review.name} className="h-full">
              <CardContent className="p-5 sm:p-6 lg:p-8">
                <div
                  className="text-amber-500 text-lg tracking-[0.18em] mb-2"
                  role="img"
                  aria-label={t("5 out of 5 stars")}
                >
                  ★★★★★
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  {t("5.0 / 5")}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  “{t(review.quote)}”
                </p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.imageAlt}
                    className="w-12 h-12 rounded-full object-cover bg-slate-100"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t(review.name)}
                    </h3>
                    <p className="text-sm text-gray-500">{t(review.course)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}