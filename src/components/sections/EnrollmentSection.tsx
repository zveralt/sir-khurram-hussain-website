"use client";

import { type FormEvent, useState } from "react";

type Props = { sectionId?: string; inquirySource?: string };

export function EnrollmentSection({
  sectionId = "enroll",
  inquirySource = "home-enrollment-section",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleEnrollmentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
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
        setMessage(json.error ?? "Something went wrong.");
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
      className="section-anchor w-full bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface py-24 lg:py-32 relative overflow-hidden"
      id={sectionId}
    >
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#123B65]/5 dark:bg-primary-container/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter relative z-10">
        <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container p-8 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-[#F7F6F2] dark:bg-surface-container-high border border-[#071B33]/10 dark:border-primary-container">
                <span className="w-2 h-2 rounded-full bg-[#123B65] dark:bg-primary animate-pulse" />
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
                  Admissions &amp; Course Access
                </span>
              </div>
              <h2 className="font-display-hero text-headline-xl lg:text-headline-xl uppercase font-bold tracking-tight text-[#071B33] dark:text-on-surface leading-[1.08]">
                Begin Your Learning Journey With Confidence.
              </h2>
              <p className="font-body-lg text-body-lg text-[#334155] dark:text-on-surface-variant max-w-xl leading-relaxed">
                For <strong className="font-semibold">digital products and LMS enrollment</strong>, use the catalogue and student portal. For <strong className="font-semibold">SKH campus batches</strong> in Karachi, contact SKH admissions directly — this form records an inquiry for the Academic Studio team; it does not guarantee a seat or automated LMS enrollment.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-6 text-[#475569] dark:text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-[18px]">
                    play_circle
                  </span>
                  <span>LMS video access (when enrolled)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-[18px]">
                    download
                  </span>
                  <span>PDF fulfilment via LMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-[18px]">
                    support_agent
                  </span>
                  <span>SKH: +92 335 7647647</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-[#F7F6F2] dark:bg-surface-container-lowest p-8 border border-[#071B33]/15 dark:border-primary-container/70 shadow-lg">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold block mb-2">
                Inquiry (non-binding)
              </span>
              <h3 className="font-headline-sm text-headline-sm uppercase text-[#071B33] dark:text-on-surface font-bold tracking-tight mb-6">
                Tell us what you need
              </h3>
              <form className="space-y-4" onSubmit={handleEnrollmentSubmit}>
                <div>
                  <label
                    htmlFor="enroll-name"
                    className="block font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline mb-1 font-medium"
                  >
                    Student / Parent Full Name
                  </label>
                  <input
                    id="enroll-name"
                    className="w-full bg-white dark:bg-surface-container border-b-2 border-[#071B33]/20 dark:border-primary-container/70 px-3 py-2.5 font-body-sm text-body-sm text-[#071B33] dark:text-on-surface placeholder:text-[#94A3B8] dark:placeholder:text-outline/50 focus:outline-none focus:border-[#123B65] dark:focus:border-primary transition-colors"
                    placeholder="Full Name"
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="enroll-email"
                    className="block font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline mb-1 font-medium"
                  >
                    Contact Email Address
                  </label>
                  <input
                    id="enroll-email"
                    className="w-full bg-white dark:bg-surface-container border-b-2 border-[#071B33]/20 dark:border-primary-container/70 px-3 py-2.5 font-body-sm text-body-sm text-[#071B33] dark:text-on-surface placeholder:text-[#94A3B8] dark:placeholder:text-outline/50 focus:outline-none focus:border-[#123B65] dark:focus:border-primary transition-colors"
                    placeholder="name@domain.com"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="enroll-course"
                    className="block font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline mb-1 font-medium"
                  >
                    Interest
                  </label>
                  <select
                    id="enroll-course"
                    name="course"
                    className="w-full bg-white dark:bg-surface-container border-b-2 border-[#071B33]/20 dark:border-primary-container/70 px-3 py-2.5 font-body-sm text-body-sm text-[#071B33] dark:text-on-surface focus:outline-none focus:border-[#123B65] dark:focus:border-primary transition-colors"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled className="bg-white dark:bg-surface-container">
                      Select an option
                    </option>
                    <option className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface" value="lms-islamiyat">
                      Digital: O Level Islamiyat / LMS
                    </option>
                    <option className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface" value="skh-campus">
                      SKH campus · Karachi coaching
                    </option>
                    <option className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface" value="resources">
                      Notes / worksheets only
                    </option>
                    <option className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface" value="other">
                      Other / not sure
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="enroll-message"
                    className="block font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline mb-1 font-medium"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="enroll-message"
                    name="message"
                    rows={3}
                    className="w-full bg-white dark:bg-surface-container border border-[#071B33]/20 dark:border-primary-container/70 px-3 py-2.5 font-body-sm text-body-sm text-[#071B33] dark:text-on-surface placeholder:text-[#94A3B8] dark:placeholder:text-outline/50 focus:outline-none focus:border-[#123B65] dark:focus:border-primary transition-colors resize-y min-h-[88px]"
                    placeholder="Level, subject, preferred campus or timeline"
                  />
                </div>
                <div className="pt-2">
                  <button
                    className="w-full py-4 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-bold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    <span>{status === "loading" ? "Sending…" : "Send inquiry"}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
                <p className="font-label-sm text-[10px] text-[#64748B] dark:text-outline text-center uppercase tracking-wider pt-2">
                  We respond during business hours. Urgent SKH matters: contact@skh.com.pk
                </p>
              </form>
              <div
                className={`mt-4 p-3 border font-label-sm text-center uppercase tracking-wider ${
                  status === "success"
                    ? "bg-emerald-50 dark:bg-primary-container/50 border-emerald-500 dark:border-primary text-emerald-800 dark:text-primary"
                    : status === "error"
                      ? "bg-red-50 dark:bg-error-container/40 border-red-400 dark:border-error text-red-900 dark:text-error"
                      : "hidden"
                }`}
                role="status"
              >
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
