import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Phone, Mail, Globe } from "lucide-react";
import { SITE_EMAIL, SITE_LOCATION, SITE_PHONE } from "../data/siteDetails";
import { useLanguage } from "../i18n/LanguageContext";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { t, language } = useLanguage();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Our Process", to: "/#process" },
    { label: "Courses", to: "/courses" },
    { label: "Instructors", to: "/instructors" },
    { label: "Reviews", to: "/#testimonials" },
    { label: "FAQ", to: "/#faq" },
    { label: "Contact", to: "/#contact" },
  ];

  function isActiveLink(to: string) {
    if (to === "/") return pathname === "/" && !hash;
    if (to === "/#process") return hash === "#process";
    if (to === "/instructors") return pathname.startsWith("/instructors");
    if (to === "/courses") return pathname.startsWith("/courses");
    if (to === "/#testimonials") return hash === "#testimonials";
    if (to === "/#faq") return hash === "#faq" || pathname === "/faq";
    return hash === "#contact" || pathname === "/contact";
  }

  function handleSectionLink(to: string) {
    return () => {
      const id = to.startsWith("/#") ? to.slice(2) : null;
      if (id && pathname === "/" && hash === `#${id}`) {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setIsOpen(false);
    };
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label={t("Open navigation menu")}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={language === "ar" ? "left" : "right"} className="w-[min(300px,calc(100vw-1rem))] border-l border-slate-200 bg-white p-5 sm:w-[360px] sm:p-6">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="pb-4 border-b">
            <h2 className="font-bold text-lg text-gray-900">EuroBridge</h2>
            <p className="text-xs text-gray-500">{t("Languages Institute")}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    aria-current={isActiveLink(link.to) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-base transition-colors ${
                      isActiveLink(link.to)
                        ? "bg-primary/10 font-bold text-primary"
                        : "font-medium text-gray-700 hover:bg-slate-50 hover:text-primary"
                    }`}
                    onClick={handleSectionLink(link.to)}
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm">{SITE_PHONE}</span>
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 break-all text-sm">{SITE_EMAIL}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm">{t(SITE_LOCATION)}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link to="/courses" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                {t("Apply Now")}
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}