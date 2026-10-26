import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { courses } from "../data/courses";
import { submitContactRequest } from "../services/contactSubmissions";
import { RegistrationForm } from "./RegistrationForm";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { SITE_EMAIL, SITE_LOCATION, SITE_LOCATION_NOTE, SITE_PHONE } from "../data/siteDetails";
import { useLanguage } from "../i18n/LanguageContext";

type Workflow = "inquiry" | "registration";
type FormState = "idle" | "submitting" | "success";

interface InquiryData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type InquiryErrors = Partial<Record<keyof InquiryData, string>>;

const EMPTY_INQUIRY: InquiryData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const INQUIRY_SUBJECTS = [
  "Course Information",
  "Pricing and Fees",
  "Class Schedules",
  "Learning Formats",
  "Other",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,}$/;

function workflowFromSearch(value: string | null): Workflow | null {
  return value === "inquiry" || value === "registration" ? value : null;
}

function courseIdFromSearch(value: string | null): number | undefined {
  const id = Number(value);
  return courses.some((course) => course.id === id) ? id : undefined;
}

function validateInquiry(form: InquiryData): InquiryErrors {
  const errors: InquiryErrors = {};
  if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (form.phone.trim() && !PHONE_RE.test(form.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!INQUIRY_SUBJECTS.includes(form.subject)) {
    errors.subject = "Please select an inquiry subject.";
  }
  if (!form.message.trim()) {
    errors.message = "Please enter your message.";
  }
  return errors;
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-500" role="alert">
      {children}
    </p>
  );
}

function InquiryForm({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_INQUIRY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [reference, setReference] = useState("");
  const submissionInProgress = useRef(false);
  const isSubmitting = formState === "submitting";

  function set<K extends keyof InquiryData>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmissionError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const nextErrors = validateInquiry(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    submissionInProgress.current = true;
    setErrors({});
    setSubmissionError("");
    setFormState("submitting");

    try {
      const confirmation = await submitContactRequest("inquiries", {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      setReference(confirmation.reference ?? "");
      setFormState("success");
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "The inquiry could not be sent. Your details were not recorded.",
      );
      setFormState("idle");
    } finally {
      submissionInProgress.current = false;
    }
  }

  const fieldClass = (error?: string) =>
    error ? "border-red-400 focus-visible:ring-red-400" : "";
  const selectClass = (error?: string) =>
    `w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
      error ? "border-red-400 focus:ring-red-400/50" : "border-gray-200"
    }`;

  if (formState === "success") {
    return (
      <div className="site-card rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-md sm:p-8">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h3 className="mb-2 text-xl font-bold text-gray-900">{t("Inquiry Sent")}</h3>
        <p className="mx-auto max-w-md text-gray-600">
          {t("Your inquiry was received. The EuroBridge team can follow up with you.")}
        </p>
        {reference && (
          <p className="mt-3 text-sm font-medium text-gray-700">
            {t("Reference:")} {reference}
          </p>
        )}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={onBack} variant="outline">{t("Switch to Course Registration")}</Button>
          <Button
            onClick={() => {
              setForm(EMPTY_INQUIRY);
              setReference("");
              setFormState("idle");
            }}
          >
            {t("Send Another Inquiry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="site-card rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
      <div className="mb-6 flex items-start gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("Switch to Course Registration")}
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="mb-1 text-xl font-bold text-gray-900">{t("General Inquiry")}</h3>
          <p className="text-sm text-gray-500">
            {t("Ask us about courses, pricing, schedules, or any other questions.")}
          </p>
        </div>
      </div>

      {submissionError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{t(submissionError)}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="inquiry-full-name" className="mb-1.5 block text-sm font-medium text-gray-700">
            {t("Full Name")} <span className="text-red-400">*</span>
          </label>
          <Input
            id="inquiry-full-name"
            autoComplete="name"
            required
            value={form.fullName}
            onChange={(event) => set("fullName", event.target.value)}
            disabled={isSubmitting}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "inquiry-full-name-error" : undefined}
            className={fieldClass(errors.fullName)}
          />
          <FieldError id="inquiry-full-name-error">{errors.fullName ? t(errors.fullName) : undefined}</FieldError>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="inquiry-email" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t("Email Address")} <span className="text-red-400">*</span>
            </label>
            <Input
              id="inquiry-email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => set("email", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "inquiry-email-error" : undefined}
              className={fieldClass(errors.email)}
            />
            <FieldError id="inquiry-email-error">{errors.email ? t(errors.email) : undefined}</FieldError>
          </div>
          <div>
            <label htmlFor="inquiry-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t("Phone Number")} <span className="text-gray-400">{t("(optional)")}</span>
            </label>
            <Input
              id="inquiry-phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => set("phone", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
              className={fieldClass(errors.phone)}
            />
            <FieldError id="inquiry-phone-error">{errors.phone ? t(errors.phone) : undefined}</FieldError>
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-subject" className="mb-1.5 block text-sm font-medium text-gray-700">
            {t("Inquiry Subject")} <span className="text-red-400">*</span>
          </label>
          <select
            id="inquiry-subject"
            required
            value={form.subject}
            onChange={(event) => set("subject", event.target.value)}
            disabled={isSubmitting}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "inquiry-subject-error" : undefined}
            className={selectClass(errors.subject)}
          >
            <option value="">{t("Select a subject")}</option>
            {INQUIRY_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>{t(subject)}</option>
            ))}
          </select>
          <FieldError id="inquiry-subject-error">{errors.subject ? t(errors.subject) : undefined}</FieldError>
        </div>

        <div>
          <label htmlFor="inquiry-message" className="mb-1.5 block text-sm font-medium text-gray-700">
            {t("Message")} <span className="text-red-400">*</span>
          </label>
          <textarea
            id="inquiry-message"
            rows={5}
            required
            value={form.message}
            onChange={(event) => set("message", event.target.value)}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "inquiry-message-error" : undefined}
            className={`w-full resize-y rounded-md border bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.message ? "border-red-400 focus:ring-red-400/50" : "border-gray-200"
            }`}
          />
          <FieldError id="inquiry-message-error">{errors.message ? t(errors.message) : undefined}</FieldError>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary py-5 text-primary-foreground hover:bg-primary/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("Sending…")}
            </>
          ) : (
            t("Send Inquiry")
          )}
        </Button>
      </form>
    </div>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(
    () => workflowFromSearch(searchParams.get("workflow")) ?? "registration",
  );
  const [preselectedCourseId, setPreselectedCourseId] = useState<number | undefined>(
    () => courseIdFromSearch(searchParams.get("courseId")),
  );

  useEffect(() => {
    setSelectedWorkflow(
      workflowFromSearch(searchParams.get("workflow")) ?? "registration",
    );
    setPreselectedCourseId(courseIdFromSearch(searchParams.get("courseId")));
  }, [searchParams]);

  return (
    <section id="contact" className="scroll-mt-24 bg-muted py-12 sm:scroll-mt-28 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-9 text-center sm:mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            {t("Get in Touch")}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            {t("Choose the best way to reach our team.")}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-6 sm:gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-7">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  {t("Or visit us")}
                </p>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  {t("We’re in Algiers")}
                </h3>
                <p className="mb-6 text-sm text-gray-600">
                  {t("Contact EuroBridge in Algiers, Algeria. This is a sample location.")}
                </p>

                <div className="space-y-5">
                  <div className="group flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-500">{t("Phone & WhatsApp")}</span>
                      <span className="font-medium text-gray-900">
                        {t(SITE_PHONE)}
                      </span>
                    </span>
                  </div>

                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="group flex items-center gap-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-gray-500">{t("Email")}</span>
                      <span className="block break-all text-sm font-medium text-gray-900 transition-colors group-hover:text-primary">
                        {SITE_EMAIL}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-500">{t("Address")}</span>
                      <span className="block font-medium text-gray-900">{SITE_LOCATION}</span>
                      <span className="block text-xs text-gray-500">{t(SITE_LOCATION_NOTE)}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden">
              <div className="h-48 bg-slate-100">
                <iframe
                  title={t("Map showing Algiers, Algeria")}
                  src="https://maps.google.com/maps?q=Algiers%2C%20Algeria&z=12&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <CardContent className="flex items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-semibold text-gray-900">{t("Visit EuroBridge")}</p>
                  <p className="text-sm text-gray-500">{SITE_LOCATION}</p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Algiers%2C%20Algeria"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("Open Algiers in Google Maps")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div
              role="group"
              aria-label={t("Contact form type")}
              className="mb-6 inline-flex w-full items-center rounded-lg border border-slate-200 bg-white p-1 sm:w-auto"
            >
              <button
                type="button"
                aria-pressed={selectedWorkflow === "inquiry"}
                onClick={() => setSelectedWorkflow("inquiry")}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-none sm:px-4 sm:text-sm ${
                  selectedWorkflow === "inquiry"
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {t("General Inquiry")}
              </button>

              <button
                type="button"
                aria-pressed={selectedWorkflow === "registration"}
                onClick={() => setSelectedWorkflow("registration")}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-none sm:px-4 sm:text-sm ${
                  selectedWorkflow === "registration"
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {t("Course Registration")}
              </button>
            </div>

            {selectedWorkflow === "inquiry" ? (
              <InquiryForm onBack={() => setSelectedWorkflow("registration")} />
            ) : (
              <RegistrationForm
                key={preselectedCourseId ?? "no-course"}
                preselectedCourseId={preselectedCourseId}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
