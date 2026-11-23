"use client";

import { CheckCircle2, ChevronDown, Clock, Loader2, Mail, MessageSquare } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { NextBatchesCard, ENQUIRY_BATCH_STORAGE_KEY } from "@/components/sections/NextBatchesCard";
import { ENQUIRY_COURSE_STORAGE_KEY } from "@/lib/enquiry-course";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { hasBatches } from "@/lib/site-config";
import { DeliveryFallback } from "@/components/forms/DeliveryFallback";
import { skhContact } from "@/lib/site";

type Props = { sectionId?: string; inquirySource?: string };

export function EnrollmentSection({
  sectionId = "register",
  inquirySource = "home-enrollment-section",
}: Props) {
  const { sectionRef, inView } = useSectionInView();
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [course, setCourse] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const applyBatch = (label: string) => {
      setCourse("skh-campus");
      if (messageRef.current) {
        const prefix = `Batch: ${label}\n`;
        if (!messageRef.current.value.startsWith(prefix)) {
          messageRef.current.value = `${prefix}${messageRef.current.value}`.trim();
        }
      }
    };
    try {
      const raw = sessionStorage.getItem(ENQUIRY_BATCH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { label?: string };
        if (parsed.label) applyBatch(parsed.label);
      }
    } catch {
      /* ignore */
    }
    const onBatch = (e: Event) => {
      const detail = (e as CustomEvent<{ label?: string }>).detail;
      if (detail?.label) applyBatch(detail.label);
    };
    window.addEventListener("enquiry-batch-selected", onBatch);
    return () => window.removeEventListener("enquiry-batch-selected", onBatch);
  }, []);

  useEffect(() => {
    const applyCourse = (value: string) => setCourse(value);
    try {
      const raw = sessionStorage.getItem(ENQUIRY_COURSE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { value?: string };
        if (parsed.value) applyCourse(parsed.value);
      }
    } catch {
      /* ignore */
    }
    const onCourse = (e: Event) => {
      const detail = (e as CustomEvent<{ value?: string }>).detail;
      if (detail?.value) applyCourse(detail.value);
    };
    window.addEventListener("enquiry-course-selected", onCourse);
    return () => window.removeEventListener("enquiry-course-selected", onCourse);
  }, []);

  async function handleEnrollmentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    setShowFallback(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      course: String(data.get("course") ?? ""),
      message: String(data.get("message") ?? ""),
      source: inquirySource,
    };
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok) {
        setStatus("error");
        if (res.status === 503) {
          setShowFallback(true);
          setMessage(null);
        } else {
          setMessage(json.error ?? "Something went wrong.");
        }
        return;
      }
      setStatus("success");
      setMessage(
        json.message ??
          (json.ok ? "Inquiry received." : "We could not confirm delivery. Please email SKH."),
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try again or email contact@skh.com.pk.");
    }
  }

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`section-anchor section-premium enquire-premium section-premium--deeper${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <span id="enroll" className="sr-only" tabIndex={-1}>
        Legacy anchor
      </span>
      <SectionScene />
      <div className="shell section-premium__shell">
        <div className="enquire-premium__layout">
          <div data-premium-reveal>
            <header className="section-premium__header section-premium__header--stacked" style={{ marginBottom: 0 }}>
              <p className="section-premium__eyebrow eyebrow">Enquire</p>
              <h2 className="section-premium__title mt-4 font-display font-semibold">
                <span className="section-premium__title-line">Begin with a conversation,</span>{" "}
                <span className="section-premium__title-accent">not a checkout.</span>
              </h2>
              <p className="section-premium__lede mt-5" style={{ maxWidth: "36ch" }}>
                Send a question to the Academic Studio. SKH admissions handle campus seats and fees.
              </p>
            </header>
            <ul className="enquire-premium__info-rows">
              <li className="enquire-premium__info-row">
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>Digital programmes — catalogue and LMS.</span>
              </li>
              <li className="enquire-premium__info-row">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>
                  SKH campus batches —{" "}
                  <a className="section-premium__link" href={`mailto:${skhContact.email}`}>
                    {skhContact.email}
                  </a>
                  {" · "}
                  <a className="section-premium__link" href={`tel:${skhContact.phoneTel}`}>
                    {skhContact.phoneDisplay}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            {hasBatches() ? <NextBatchesCard /> : null}
            <div
              className="section-premium__glass-card enquire-premium__form-card"
              data-premium-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
            {status === "success" ? (
              <div className="enquire-premium__success" role="status">
                <span className="enquire-premium__success-icon" aria-hidden>
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <p className="text-fg font-display text-lg font-semibold">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleEnrollmentSubmit}>
                <div className="enquire-premium__field">
                  <label htmlFor="enroll-name" className="enquire-premium__field-label">
                    Student or parent name
                  </label>
                  <input
                    id="enroll-name"
                    className={`enquire-premium__input${status === "error" ? " enquire-premium__input--error" : ""}`}
                    placeholder="Full name"
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                  />
                </div>
                <div className="enquire-premium__field">
                  <label htmlFor="enroll-email" className="enquire-premium__field-label">
                    Email
                  </label>
                  <input
                    id="enroll-email"
                    className={`enquire-premium__input${status === "error" ? " enquire-premium__input--error" : ""}`}
                    placeholder="name@domain.com"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </div>
                <div className="enquire-premium__field">
                  <label htmlFor="enroll-course" className="enquire-premium__field-label">
                    Interest
                  </label>
                  <div className="enquire-premium__select-wrap">
                    <select
                      id="enroll-course"
                      name="course"
                      className="enquire-premium__input"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="lms-islamiyat">Digital: O Level Islamiyat / LMS</option>
                      <option value="skh-campus">SKH campus · Karachi coaching</option>
                      <option value="resources">Notes / worksheets</option>
                      <option value="other">Other / not sure</option>
                    </select>
                    <ChevronDown className="enquire-premium__select-chevron h-4 w-4" aria-hidden />
                  </div>
                </div>
                <div className="enquire-premium__field">
                  <label htmlFor="enroll-message" className="enquire-premium__field-label">
                    Message (optional)
                  </label>
                  <textarea
                    ref={messageRef}
                    id="enroll-message"
                    name="message"
                    rows={3}
                    className="enquire-premium__input resize-y min-h-[5.5rem]"
                    placeholder="Level, subject, campus, or timeline"
                  />
                </div>
                {status === "error" && showFallback ? (
                  <div className="mb-4">
                    <DeliveryFallback />
                  </div>
                ) : null}
                {status === "error" && message ? (
                  <p className="mb-4 text-sm text-fg" role="alert">
                    {message}
                  </p>
                ) : null}
                <button type="submit" className="btn btn-primary w-full sm:w-auto min-h-12" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send inquiry <span className="arrow">→</span>
                    </>
                  )}
                </button>
                <p className="enquire-premium__note">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    We reply in business hours. Urgent SKH matters: {skhContact.email}
                  </span>
                </p>
              </form>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
