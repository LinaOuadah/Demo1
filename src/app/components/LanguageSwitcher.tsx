import { useLanguage, type Language } from "../i18n/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={language === "ar" ? "اختر اللغة" : "Choisir la langue"}
      className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1"
    >
      {(["ar", "fr"] as const).map((option: Language) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            language === option
              ? "bg-primary text-white"
              : "text-slate-600 hover:text-primary"
          }`}
        >
          {option === "ar" ? "العربية" : "Français"}
        </button>
      ))}
    </div>
  );
}
