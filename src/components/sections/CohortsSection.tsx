"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

export function CohortsSection() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const toggleCohortDrawer = useCallback((id: string) => {
    setOpenDrawer((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      className="w-full bg-[#F7F6F2] dark:bg-surface-container-lowest text-[#071B33] dark:text-on-surface py-24 lg:py-32 border-b border-[#071B33]/10 dark:border-primary-container/40"
      id="cohorts"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-16 border-b border-[#071B33]/15 dark:border-primary-container/40">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 bg-[#123B65] dark:bg-primary" />
              <span className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
                02 / Structured Courses &amp; Video Lectures
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight">
              Structured Learning Tracks.
            </h2>
          </div>
          <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant max-w-md">
            Comprehensive learning tracks combining recorded video lectures, live diagnostic
            workshops, and step-by-step problem sets designed for independent mastery.
          </p>
        </div>

        <div className="space-y-8">
          {/* Course 01 */}
          <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all duration-300 p-8 lg:p-10 shadow-sm dark:shadow-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-1">
                <span className="font-headline-md text-headline-md font-bold text-[#123B65] dark:text-primary">
                  01
                </span>
              </div>
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#123B65]/10 dark:bg-primary-container/70 border border-[#123B65]/30 dark:border-primary/30 font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-semibold">
                    Video Lectures + Problem Sets
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F6F2] dark:bg-surface-container-high border border-[#071B33]/10 dark:border-outline-variant/30 font-label-sm text-label-sm uppercase tracking-wider text-[#334155] dark:text-secondary-fixed">
                    Modular Worksheets
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm uppercase text-[#123B65] dark:text-secondary font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Enrollment Open
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-md lg:text-headline-lg font-bold uppercase text-[#071B33] dark:text-on-surface tracking-tight">
                  [Foundation &amp; Advanced Pure Mathematics]
                </h3>
                <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant leading-relaxed">
                  Complete lecture modules, modular worksheets, and video walkthroughs covering
                  fundamental algebra, calculus, functions, and trigonometry with clear, intuitive
                  derivations.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#071B33]/10 dark:border-primary-container/40 text-[#475569] dark:text-on-surface-variant font-label-sm text-label-sm">
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Format
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Video Vault + Worksheets
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Structure
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Self-Paced Modules
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Target
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      [Secondary / A-Level]
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Access
                    </span>
                    <span className="text-[#123B65] dark:text-primary font-semibold">
                      Immediate Access
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end h-full gap-6">
                <div className="text-right hidden lg:block">
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#64748B] dark:text-outline block font-medium">
                    Learning Track
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold">
                    Comprehensive Course
                  </span>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    className="w-full text-center px-6 py-3.5 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-colors shadow-sm"
                    href="#enroll"
                  >
                    Explore Syllabus &amp; Enroll
                  </Link>
                  <button
                    type="button"
                    className="w-full text-center px-6 py-3.5 bg-transparent border border-[#071B33]/25 dark:border-primary-container text-[#071B33] dark:text-on-surface hover:bg-[#EDEAE1] dark:hover:bg-primary-container/40 font-label-md text-label-md uppercase tracking-wider transition-colors"
                    onClick={() => toggleCohortDrawer("drawer-01")}
                  >
                    Inspect Module Breakdown
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`mt-8 pt-8 border-t border-[#071B33]/15 dark:border-primary-container/60 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F7F6F2] dark:bg-surface-container-low p-6 ${openDrawer === "drawer-01" ? "grid" : "hidden"}`}
              id="drawer-01"
            >
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 1
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Algebraic Structures &amp; Proof
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Foundational equations, functions, coordinate geometry, and logical proof
                  methods.
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 2
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Calculus &amp; Differentiation
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Rates of change, integration techniques, geometric interpretation, and
                  applications.
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 3
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Advanced Problem Scenarios
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Synthesis question drills, error mitigation techniques, and comprehensive
                  walkthroughs.
                </p>
              </div>
            </div>
          </div>

          {/* Course 02 */}
          <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all duration-300 p-8 lg:p-10 shadow-sm dark:shadow-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-1">
                <span className="font-headline-md text-headline-md font-bold text-[#123B65] dark:text-primary">
                  02
                </span>
              </div>
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#123B65]/10 dark:bg-primary-container/70 border border-[#123B65]/30 dark:border-primary/30 font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-semibold">
                    Interactive Problem Labs
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F6F2] dark:bg-surface-container-high border border-[#071B33]/10 dark:border-outline-variant/30 font-label-sm text-label-sm uppercase tracking-wider text-[#334155] dark:text-secondary-fixed">
                    Downloadable Guides
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm uppercase text-[#123B65] dark:text-secondary font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Enrollment Open
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-md lg:text-headline-lg font-bold uppercase text-[#071B33] dark:text-on-surface tracking-tight">
                  [Analytical Sciences &amp; Applied Problem-Solving]
                </h3>
                <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant leading-relaxed">
                  Core concept lectures, interactive problem labs, and downloadable guides designed
                  to transform complex scientific equations into intuitive mental models.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#071B33]/10 dark:border-primary-container/40 text-[#475569] dark:text-on-surface-variant font-label-sm text-label-sm">
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Format
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Video Lessons + Problem Labs
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Structure
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Modular Units
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Target
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      [Secondary / Sciences]
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Access
                    </span>
                    <span className="text-[#123B65] dark:text-primary font-semibold">
                      Immediate Access
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end h-full gap-6">
                <div className="text-right hidden lg:block">
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#64748B] dark:text-outline block font-medium">
                    Learning Track
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold">
                    Analytical Sciences Track
                  </span>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    className="w-full text-center px-6 py-3.5 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-colors shadow-sm"
                    href="#enroll"
                  >
                    Explore Syllabus &amp; Enroll
                  </Link>
                  <button
                    type="button"
                    className="w-full text-center px-6 py-3.5 bg-transparent border border-[#071B33]/25 dark:border-primary-container text-[#071B33] dark:text-on-surface hover:bg-[#EDEAE1] dark:hover:bg-primary-container/40 font-label-md text-label-md uppercase tracking-wider transition-colors"
                    onClick={() => toggleCohortDrawer("drawer-02")}
                  >
                    Inspect Module Breakdown
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`mt-8 pt-8 border-t border-[#071B33]/15 dark:border-primary-container/60 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F7F6F2] dark:bg-surface-container-low p-6 ${openDrawer === "drawer-02" ? "grid" : "hidden"}`}
              id="drawer-02"
            >
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 1
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Kinematics &amp; Force Modeling
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Translational and rotational mechanics with vector breakdowns and energy
                  transfer.
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 2
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Field Theories &amp; Waves
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Electromagnetic fields, gravitational mechanics, wave interactions, and
                  oscillation theory.
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 3
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Applied Diagnostic Labs
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Step-by-step experiment modeling, computational scenarios, and conceptual
                  checks.
                </p>
              </div>
            </div>
          </div>

          {/* Course 03 */}
          <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all duration-300 p-8 lg:p-10 shadow-sm dark:shadow-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-1">
                <span className="font-headline-md text-headline-md font-bold text-[#123B65] dark:text-primary">
                  03
                </span>
              </div>
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#123B65]/10 dark:bg-primary-container/70 border border-[#123B65]/30 dark:border-primary/30 font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-semibold">
                    Past-Paper Deconstructions
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F6F2] dark:bg-surface-container-high border border-[#071B33]/10 dark:border-outline-variant/30 font-label-sm text-label-sm uppercase tracking-wider text-[#334155] dark:text-secondary-fixed">
                    Topical Frameworks
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm uppercase text-[#123B65] dark:text-secondary font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Enrollment Open
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-md lg:text-headline-lg font-bold uppercase text-[#071B33] dark:text-on-surface tracking-tight">
                  [Examination Strategy &amp; Comprehensive Revision]
                </h3>
                <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant leading-relaxed">
                  Structured past-paper deconstructions and topical revision frameworks to build
                  exam pacing, error detection, and systematic solution formulation.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#071B33]/10 dark:border-primary-container/40 text-[#475569] dark:text-on-surface-variant font-label-sm text-label-sm">
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Format
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Video Review + Topical Packets
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Structure
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Targeted Revision Units
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Target
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      [Secondary Final Year]
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Access
                    </span>
                    <span className="text-[#123B65] dark:text-primary font-semibold">
                      Immediate Access
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end h-full gap-6">
                <div className="text-right hidden lg:block">
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#64748B] dark:text-outline block font-medium">
                    Learning Track
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold">
                    Revision Track
                  </span>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    className="w-full text-center px-6 py-3.5 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-colors shadow-sm"
                    href="#enroll"
                  >
                    Explore Syllabus &amp; Enroll
                  </Link>
                  <button
                    type="button"
                    className="w-full text-center px-6 py-3.5 bg-transparent border border-[#071B33]/25 dark:border-primary-container text-[#071B33] dark:text-on-surface hover:bg-[#EDEAE1] dark:hover:bg-primary-container/40 font-label-md text-label-md uppercase tracking-wider transition-colors"
                    onClick={() => toggleCohortDrawer("drawer-03")}
                  >
                    Inspect Module Breakdown
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`mt-8 pt-8 border-t border-[#071B33]/15 dark:border-primary-container/60 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F7F6F2] dark:bg-surface-container-low p-6 ${openDrawer === "drawer-03" ? "grid" : "hidden"}`}
              id="drawer-03"
            >
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 1
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Topic-by-Topic Diagnostic Drill
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Categorized review packets addressing typical pitfalls and high-weightage
                  topics.
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 2
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Time Allocation Protocols
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Tactical pacing models for timed examination settings and triage techniques.
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 3
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Annotated Marking Schemes
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Exemplar model answers showing full method credit derivation and examiner
                  insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
