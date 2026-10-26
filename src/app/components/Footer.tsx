import { Button } from "./ui/button";
import { Link } from "react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "figma:asset/d8f835d62f827a1ce7788418f77112d91647df55.png";
import { SITE_EMAIL, SITE_LOCATION, SITE_LOCATION_NOTE, SITE_PHONE } from "../data/siteDetails";
import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 py-10 sm:py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6" aria-label={t("EuroBridge home")}>
              <img src={logo} alt={t("EuroBridge Languages Institute")} className="h-12 w-12" />
              <div className="ml-3">
                <div className="font-semibold text-lg">EuroBridge</div>
                <div className="text-sm text-gray-300">{t("Languages Institute")}</div>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t("Discover language courses and learning opportunities for your future.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-lg sm:mb-6">{t("Explore")}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">{t("Home")}</Link></li>
              <li><Link to="/#process" className="text-gray-300 hover:text-white transition-colors">{t("Our Process")}</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-white transition-colors">{t("Courses")}</Link></li>
              <li><Link to="/#testimonials" className="text-gray-300 hover:text-white transition-colors">{t("Reviews")}</Link></li>
              <li><Link to="/instructors" className="text-gray-300 hover:text-white transition-colors">{t("Instructors")}</Link></li>
              <li><Link to="/#faq" className="text-gray-300 hover:text-white transition-colors">{t("FAQ")}</Link></li>
              <li><Link to="/#contact" className="text-gray-300 hover:text-white transition-colors">{t("Contact")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-lg sm:mb-6">{t("Get In Touch")}</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{t(SITE_LOCATION)}</p>
                  <p className="text-xs text-gray-400">{t(SITE_LOCATION_NOTE)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">{t("Phone & WhatsApp")}</p>
                  <span className="text-sm text-gray-300">{t(SITE_PHONE)}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <a href={`mailto:${SITE_EMAIL}`} className="text-gray-300 text-sm hover:text-white break-all">
                    {SITE_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <Link to="/#contact">
              <Button className="bg-primary hover:bg-primary/90 text-white">{t("Contact Us")}</Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EuroBridge Languages Institute. {t("All rights reserved.")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}