import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";
import { SITE_EMAIL, SITE_LOCATION } from "../data/siteDetails";
import logo from "figma:asset/d8f835d62f827a1ce7788418f77112d91647df55.png";

export function Header() {
  const { pathname, hash } = useLocation();
  const { t } = useLanguage();

  function linkClass(isActive: boolean) {
    return `text-sm transition-colors hover:text-primary ${
      isActive
        ? "font-bold text-primary"
        : "font-medium text-gray-600"
    }`;
  }

  function scrollToCurrentSection(id: string) {
    if (pathname === "/" && hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </div>
            <div className="hidden xl:block text-sm">
              {t(SITE_LOCATION)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Desktop links sit in their own top row instead of beside the logo. */}
          <nav
            aria-label={t("Main navigation")}
            className="hidden min-h-12 items-center justify-center gap-5 border-b border-border/70 lg:flex"
          >
            <Link to="/" aria-current={pathname === "/" && !hash ? "page" : undefined} className={`${linkClass(pathname === "/" && !hash)} whitespace-nowrap`}>{t("Home")}</Link>
            <Link to="/#process" aria-current={hash === "#process" ? "page" : undefined} className={`${linkClass(hash === "#process")} whitespace-nowrap`} onClick={() => scrollToCurrentSection("process")}>{t("Our Process")}</Link>
            <Link to="/courses" aria-current={pathname.startsWith("/courses") ? "page" : undefined} className={`${linkClass(pathname.startsWith("/courses"))} whitespace-nowrap`}>{t("Courses")}</Link>
            <Link to="/instructors" aria-current={pathname.startsWith("/instructors") ? "page" : undefined} className={`${linkClass(pathname.startsWith("/instructors"))} whitespace-nowrap`}>{t("Instructors")}</Link>
            <Link to="/#testimonials" aria-current={hash === "#testimonials" ? "page" : undefined} className={`${linkClass(hash === "#testimonials")} whitespace-nowrap`} onClick={() => scrollToCurrentSection("testimonials")}>{t("Reviews")}</Link>
            <Link to="/#faq" aria-current={hash === "#faq" || pathname === "/faq" ? "page" : undefined} className={`${linkClass(hash === "#faq" || pathname === "/faq")} whitespace-nowrap`} onClick={() => scrollToCurrentSection("faq")}>{t("FAQ")}</Link>
            <Link to="/#contact" aria-current={hash === "#contact" || pathname === "/contact" ? "page" : undefined} className={`${linkClass(hash === "#contact" || pathname === "/contact")} whitespace-nowrap`} onClick={() => scrollToCurrentSection("contact")}>{t("Contact")}</Link>
          </nav>

          <div className="flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center" aria-label={t("EuroBridge home")}>
              <img src={logo} alt={t("EuroBridge Languages Institute")} className="h-12 w-12" />
              <div className="ml-3">
                <div className="font-semibold text-lg text-gray-900">EuroBridge</div>
                <div className="text-xs text-gray-600">{t("Languages Institute")}</div>
              </div>
            </Link>

            {/* CTA Button */}
            <Link to="/courses" className="hidden 2xl:inline-flex">
              <Button className="bg-primary hover:bg-primary/90 text-white">
              {t("Apply Now")}
              </Button>
            </Link>

            {/* Mobile menu */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="lg:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}