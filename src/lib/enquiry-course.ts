export const ENQUIRY_COURSE_STORAGE_KEY = "enquiry-course";

export function selectCourseForRegistration(courseValue: string, courseTitle: string) {
  try {
    sessionStorage.setItem(ENQUIRY_COURSE_STORAGE_KEY, JSON.stringify({ value: courseValue, title: courseTitle }));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("enquiry-course-selected", { detail: { value: courseValue, title: courseTitle } }));
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
}
