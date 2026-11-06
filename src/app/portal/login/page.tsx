import type { Metadata } from "next";
import { LoginForm } from "@/app/portal/login/LoginForm";

export const metadata: Metadata = {
  title: "Student sign in",
  description: "Development fixture sign-in and LMS link-out for Aark Academy Learn360.",
};

export default function PortalLoginPage() {
  return (
    <main id="main-content" className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pb-24">
      <h1 className="font-headline-xl text-headline-lg uppercase font-bold tracking-tight mb-4">Student portal</h1>
      <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant max-w-2xl mb-10">
        In <strong className="font-semibold">development</strong>, you can create a lightweight fixture session to preview the dashboard layout.
        In <strong className="font-semibold">production</strong>, authentication is handled by the LMS — we will not impersonate that flow until the API contract is implemented.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="border border-[#071B33]/15 dark:border-primary-container/60 p-6 bg-white dark:bg-surface-container">
          <h2 className="font-headline-sm uppercase font-bold mb-4">Fixture login (dev only)</h2>
          <LoginForm />
        </div>
        <div className="border border-[#071B33]/15 dark:border-primary-container/60 p-6 bg-white dark:bg-surface-container">
          <h2 className="font-headline-sm uppercase font-bold mb-4">Official LMS</h2>
          <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mb-4">
            Use your real Aark Academy credentials on Learn360 for courses, payments, and downloads.
          </p>
          <a
            href="https://aark-academy.learn360lms.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#123B65] dark:bg-primary text-white font-label-md uppercase tracking-wider"
          >
            Sign in on Learn360
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        </div>
      </div>
    </main>
  );
}
