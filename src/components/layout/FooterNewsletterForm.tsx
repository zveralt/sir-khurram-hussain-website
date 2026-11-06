"use client";

export function FooterNewsletterForm() {
  return (
    <form
      className="flex flex-col gap-space-sm"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative flex items-center border-b border-[#245B91]/50 focus-within:border-on-surface">
        <input
          className="w-full bg-transparent py-space-sm font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
          placeholder="academic.address@institution.edu"
          type="email"
          name="newsletter-email"
          autoComplete="email"
          aria-label="Email for newsletter"
        />
        <button
          className="px-space-sm text-on-surface hover:text-primary transition-colors"
          type="submit"
          aria-label="Subscribe"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
      <span className="font-label-sm text-label-sm text-outline">
        Published semimonthly. Strict privacy protocol.
      </span>
    </form>
  );
}
