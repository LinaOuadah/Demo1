import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { courses } from "../data/courses";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeCourse } from "../i18n/localizedData";
import { submitContactRequest } from "../services/contactSubmissions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FORMATS = ["Online", "In-person", "Combined"];
const LEVELS = [
  "Complete Beginner",
  "Elementary",
  "Intermediate",
  "Advanced",
  "Not Sure",
];
const SCHEDULES = ["Morning", "Afternoon", "Evening", "Flexible"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,}$/;

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  format: string;
  level: string;
  schedule: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;
type FormState = "idle" | "submitting" | "success";

const EMPTY_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  courseId: "",
  format: "",
  level: "",
  schedule: "",
  notes: "",
};

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (form.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone number or WhatsApp is required.";
  } else if (!PHONE_RE.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!courses.some((course) => String(course.id) === form.courseId)) {
    errors.courseId = "Select a course.";
  }
  if (!FORMATS.includes(form.format)) {
    errors.format = "Select your preferred learning format.";
  }
  if (!LEVELS.includes(form.level)) {
    errors.level = "Select your current language level.";
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

export function RegistrationForm({
  preselectedCourseId,
  onBack,
}: {
  preselectedCourseId?: number;
  onBack: () => void;
}) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState<FormData>({
    ...EMPTY_FORM,
    courseId: preselectedCourseId ? String(preselectedCourseId) : "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [reference, setReference] = useState("");
  const submissionInProgress = useRef(false);
  const isSubmitting = formState === "submitting";

  function set<K extends keyof FormData>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmissionError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    submissionInProgress.current = true;
    setErrors({});
    setSubmissionError("");
    setFormState("submitting");

    try {
      const selectedCourse = courses.find(
        (course) => String(course.id) === form.courseId,
      );
      const confirmation = await submitContactRequest(
        "registration-requests",
        {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          courseId: form.courseId,
          courseTitle: selectedCourse?.title ?? "",
          preferredFormat: form.format,
          currentLevel: form.level,
          preferredSchedule: form.schedule,
          additionalNotes: form.notes.trim(),
        },
      );
      setReference(confirmation.reference ?? "");
      setFormState("success");
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "The request could not be sent. Your details were not recorded.",
      );
      setFormState("idle");
    } finally {
      submissionInProgress.current = false;
    }
  }

  if (formState === "success") {
    return (
      <div className="site-card rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-md sm:p-8">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h3 className="mb-2 text-xl font-bold text-gray-900">
            {t("Request Received")}
        </h3>
        <p className="mx-auto max-w-md text-gray-600">
          {t("Your registration request has been received. The institute will follow up with you. This is a request, not a confirmed enrollment.")}
        </p>
        {reference && (
          <p className="mt-3 text-sm font-medium text-gray-700">
            {t("Reference:")} {reference}
          </p>
        )}
        <Button className="mt-6" onClick={onBack}>
          {t("Back to Contact Options")}
        </Button>
      </div>
    );
  }

  const inputClass = (error?: string) =>
    error ? "border-red-400 focus-visible:ring-red-400" : "";
  const selectClass = (error?: string) =>
    `w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
      error ? "border-red-400 focus:ring-red-400/50" : "border-gray-200"
    }`;

  return (
    <div className="site-card rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
      <div className="mb-6">
        <h3 className="mb-1 text-xl font-bold text-gray-900">
          {t("Course Registration Request")}
        </h3>
        <p className="text-sm text-gray-500">
          {t("Send a request and the institute can follow up about next steps. This does not confirm enrollment.")}
        </p>
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
          <label htmlFor="registration-full-name" className="mb-1.5 block text-sm font-medium text-gray-700">
            {t("Full Name")} <span className="text-red-400">*</span>
          </label>
          <Input
            id="registration-full-name"
            autoComplete="name"
            required
            value={form.fullName}
            onChange={(event) => set("fullName", event.target.value)}
            disabled={isSubmitting}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "registration-full-name-error" : undefined}
            className={inputClass(errors.fullName)}
          />
          <FieldError id="registration-full-name-error">{errors.fullName ? t(errors.fullName) : undefined}</FieldError>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="registration-email" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t("Email Address")} <span className="text-red-400">*</span>
            </label>
            <Input
              id="registration-email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => set("email", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "registration-email-error" : undefined}
              className={inputClass(errors.email)}
            />
            <FieldError id="registration-email-error">{errors.email ? t(errors.email) : undefined}</FieldError>
          </div>
          <div>
            <label htmlFor="registration-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t("Phone Number / WhatsApp")} <span className="text-red-400">*</span>
            </label>
            <Input
              id="registration-phone"
              type="tel"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={(event) => set("phone", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "registration-phone-error" : undefined}
              className={inputClass(errors.phone)}
            />
            <FieldError id="registration-phone-error">{errors.phone ? t(errors.phone) : undefined}</FieldError>
          </div>
        </div>

        <div>
          <label htmlFor="registration-course" className="mb-1.5 block text-sm font-medium text-gray-700">
            {t("Course")} <span className="text-red-400">*</span>
          </label>
          <select
            id="registration-course"
            required
            value={form.courseId}
            onChange={(event) => set("courseId", event.target.value)}
            disabled={isSubmitting}
            aria-invalid={!!errors.courseId}
            aria-describedby={errors.courseId ? "registration-course-error" : undefined}
            className={selectClass(errors.courseId)}
          >
            <option value="">{t("Select a course")}</option>
            {courses.map((rawCourse) => {
              const course = localizeCourse(rawCourse, language);
              return (
              <option key={course.id} value={String(course.id)}>
                {course.title}
              </option>
              );
            })}
          </select>
          <FieldError id="registration-course-error">{errors.courseId ? t(errors.courseId) : undefined}</FieldError>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="registration-format" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t("Preferred Learning Format")} <span className="text-red-400">*</span>
            </label>
            <select
              id="registration-format"
              required
              value={form.format}
              onChange={(event) => set("format", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.format}
              aria-describedby={errors.format ? "registration-format-error" : undefined}
              className={selectClass(errors.format)}
            >
              <option value="">{t("Select a format")}</option>
              {FORMATS.map((format) => (
                <option key={format} value={format}>{t(format)}</option>
              ))}
            </select>
            <FieldError id="registration-format-error">{errors.format ? t(errors.format) : undefined}</FieldError>
          </div>
          <div>
            <label htmlFor="registration-level" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t("Current Language Level")} <span className="text-red-400">*</span>
            </label>
            <select
              id="registration-level"
              required
              value={form.level}
              onChange={(event) => set("level", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.level}
              aria-describedby={errors.level ? "registration-level-error" : undefined}
              className={selectClass(errors.level)}
            >
              <option value="">{t("Select your level")}</option>
              {LEVELS.map((level) => (
                <option key={level} value={level}>{t(level)}</option>
              ))}
            </select>
            <FieldError id="registration-level-error">{errors.level ? t(errors.level) : undefined}</FieldError>
          </div>
        </div>

        <div>
          <label htmlFor="registration-schedule" className="mb-1.5 block text-sm font-medium text-gray-700">
            {t("Preferred Schedule")} <span className="text-gray-400">{t("(optional)")}</span>
          </label>
          <select
            id="registration-schedule"
            value={form.schedule}
            onChange={(event) => set("schedule", event.target.value)}
            disabled={isSubmitting}
            className={selectClass()}
          >
            <option value="">{t("Select a schedule")}</option>
            {SCHEDULES.map((schedule) => (
              <option key={schedule} value={schedule}>{t(schedule)}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="registration-notes" className="mb-1.5 block text-sm font-medium text-gray-700">
            {t("Additional Notes")} <span className="text-gray-400">{t("(optional)")}</span>
          </label>
          <textarea
            id="registration-notes"
            rows={4}
            value={form.notes}
            onChange={(event) => set("notes", event.target.value)}
            disabled={isSubmitting}
            className="w-full resize-y rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary py-5 text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("Submitting…")}
              </>
            ) : (
              t("Submit Registration Request")
            )}
          </Button>
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            {t("Back")}
          </Button>
        </div>
      </form>
    </div>
  );
}
