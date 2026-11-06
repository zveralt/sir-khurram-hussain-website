"use client";

import { type FormEvent, useState } from "react";
import { skhContact } from "@/lib/site";

type Props = { sectionId?: string; inquirySource?: string };

const fieldClass = "field";
const labelClass = "eyebrow";

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
    <section id={sectionId} className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-accent">Enquire</p>
            <h2 className="mt-5 font-heading text-h2 font-semibold text-fg">
              Begin with a conversation, not a checkout.
            </h2>
            <p className="mt-6 text-lede text-soft max-w-md">
              This form is an inquiry to the Academic Studio. It does not enrol you, take payment,
              or guarantee a campus seat.
            </p>
            <ul className="mt-10 space-y-3 text-sm text-soft">
              <li>
                Digital programmes — catalogue and LMS.
              </li>
              <li>
                SKH campus batches —{" "}
                <a className="link-u text-fg" href={`mailto:${skhContact.email}`}>
                  {skhContact.email}
                </a>
                {" · "}
                <a className="link-u text-fg" href={`tel:${skhContact.phoneTel}`}>
                  {skhContact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <form className="lg:col-span-7 space-y-8" onSubmit={handleEnrollmentSubmit}>
            <div>
              <label htmlFor="enroll-name" className={labelClass}>
                Student or parent name
              </label>
              <input
                id="enroll-name"
                className={fieldClass}
                placeholder="Full name"
                required
                type="text"
                name="name"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="enroll-email" className={labelClass}>
                Email
              </label>
              <input
                id="enroll-email"
                className={fieldClass}
                placeholder="name@domain.com"
                required
                type="email"
                name="email"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="enroll-course" className={labelClass}>
                Interest
              </label>
              <select id="enroll-course" name="course" className={fieldClass} defaultValue="" required>
                <option value="" disabled>
                  Select an option
                </option>
                <option value="lms-islamiyat">Digital: O Level Islamiyat / LMS</option>
                <option value="skh-campus">SKH campus · Karachi coaching</option>
                <option value="resources">Notes / worksheets</option>
                <option value="other">Other / not sure</option>
              </select>
            </div>
            <div>
              <label htmlFor="enroll-message" className={labelClass}>
                Message (optional)
              </label>
              <textarea
                id="enroll-message"
                name="message"
                rows={3}
                className={`${fieldClass} resize-y min-h-[5.5rem]`}
                placeholder="Level, subject, campus, or timeline"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send inquiry"}
              <span className="arrow">→</span>
            </button>
            <p className="text-xs text-muted">
              We reply in business hours. Urgent SKH matters: {skhContact.email}
            </p>
            <div
              className={
                status === "success" || status === "error"
                  ? `text-sm ${status === "error" ? "text-red-700 dark:text-red-300" : "text-accent"}`
                  : "hidden"
              }
              role="status"
            >
              {message}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
