import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Courses } from "./components/Courses";
import { LearningProcess } from "./components/LearningProcess";
import { FeaturedInstructors } from "./components/FeaturedInstructors";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { CoursesCatalog } from "./components/CoursesCatalog";
import { CourseDetail } from "./components/CourseDetail";
import { Instructors } from "./components/Instructors";
import { InstructorDetail } from "./components/InstructorDetail";
import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { LanguageProvider } from "./i18n/LanguageContext";

function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <LearningProcess />
        <Courses />
        <FeaturedInstructors />
        <Testimonials />
        <FAQ limit={4} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function CatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CoursesCatalog />
      <Footer />
    </div>
  );
}

function DetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CourseDetail />
      <Footer />
    </div>
  );
}

function InstructorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Instructors />
      <Footer />
    </div>
  );
}

function InstructorDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <InstructorDetail />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CatalogPage />} />
          <Route path="/courses/:id" element={<DetailPage />} />
          <Route path="/instructors" element={<InstructorsPage />} />
          <Route path="/instructors/:id" element={<InstructorDetailPage />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<div className="min-h-screen bg-background"><Header /><Contact /><Footer /></div>} />
          <Route path="/faq" element={<div className="min-h-screen bg-background"><Header /><FAQ /><Footer /></div>} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
