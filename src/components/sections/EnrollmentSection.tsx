"use client";

import { type FormEvent, useState } from "react";

export function EnrollmentSection() {
  const [showSuccess, setShowSuccess] = useState(false);

  function handleEnrollmentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowSuccess(true);
    e.currentTarget.reset();
  }

  return (
    <section
      className="w-full bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface py-24 lg:py-32 relative overflow-hidden"
      id="enroll"
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
                Access structured video courses, purchase complete study compendiums, or request
                diagnostic guidance from our academic studio. We provide a clear pathway for
                students seeking genuine understanding.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-6 text-[#475569] dark:text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-[18px]">
                    play_circle
                  </span>
                  <span>Instant Video Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-[18px]">
                    download
                  </span>
                  <span>Downloadable Study Packs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-[18px]">
                    support_agent
                  </span>
                  <span>Dedicated Guidance</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-[#F7F6F2] dark:bg-surface-container-lowest p-8 border border-[#071B33]/15 dark:border-primary-container/70 shadow-lg">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold block mb-2">
                Enrollment &amp; Inquiry
              </span>
              <h3 className="font-headline-sm text-headline-sm uppercase text-[#071B33] dark:text-on-surface font-bold tracking-tight mb-6">
                Get Started Today
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
                    Desired Course or Resource
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
                    <option
                      className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface"
                      value="math"
                    >
                      [Foundation &amp; Advanced Pure Mathematics]
                    </option>
                    <option
                      className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface"
                      value="sciences"
                    >
                      [Analytical Sciences &amp; Applied Problem-Solving]
                    </option>
                    <option
                      className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface"
                      value="revision"
                    >
                      [Examination Strategy &amp; Comprehensive Revision]
                    </option>
                    <option
                      className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface"
                      value="resources"
                    >
                      Study Resource Packs &amp; Worksheets Only
                    </option>
                    <option
                      className="bg-white dark:bg-surface-container text-[#071B33] dark:text-on-surface"
                      value="consult"
                    >
                      Diagnostic Learning Consultation
                    </option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    className="w-full py-4 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-bold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 shadow-md"
                    type="submit"
                  >
                    <span>Request Course Access &amp; Information</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
                <p className="font-label-sm text-[10px] text-[#64748B] dark:text-outline text-center uppercase tracking-wider pt-2">
                  Prompt Response • Clear guidance tailored to your academic needs
                </p>
              </form>
              <div
                className={`mt-4 p-3 bg-emerald-50 dark:bg-primary-container/50 border border-emerald-500 dark:border-primary text-emerald-800 dark:text-primary font-label-sm text-center uppercase tracking-wider ${showSuccess ? "block" : "hidden"}`}
                id="form-success"
                role="status"
              >
                Inquiry received. Our academic studio team will reach out with course access
                details.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
