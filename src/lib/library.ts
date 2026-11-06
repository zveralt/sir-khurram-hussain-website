/** Titles as published on https://www.skh.com.pk/booksnotes/ — availability and format are confirmed by SKH. */
export type LibraryTitle = {
  no: number;
  title: string;
  series: "Qur'an" | "Seerah" | "Hadith" | "History" | "Faith & Practice" | "Examination";
};

export const SKH_BOOKS_URL = "https://www.skh.com.pk/booksnotes/";

export const LIBRARY_TITLES: LibraryTitle[] = [
  { no: 1, title: "The Qur'anic Passages", series: "Qur'an" },
  { no: 2, title: "The History & Importance of Qur'an", series: "Qur'an" },
  { no: 3, title: "The Biography of Muhammad (PBUH) — Life in Makkah", series: "Seerah" },
  { no: 4, title: "The Biography of Muhammad (PBUH)", series: "Seerah" },
  { no: 5, title: "The First Muslim Community", series: "History" },
  { no: 6, title: "The Ahadith of Prophet Muhammad (PBUH)", series: "Hadith" },
  { no: 7, title: "The History & Importance of Hadith", series: "Hadith" },
  { no: 8, title: "The Rightly Guided Caliphs", series: "History" },
  { no: 9, title: "The Articles of Faith & the Modes of Jihad", series: "Faith & Practice" },
  { no: 10, title: "The Five Pillars of Islam", series: "Faith & Practice" },
  { no: 11, title: "The Exam Guide for Students", series: "Examination" },
  { no: 12, title: "The Review Book No. 1", series: "Examination" },
  { no: 13, title: "The Review Book No. 2", series: "Examination" },
];
