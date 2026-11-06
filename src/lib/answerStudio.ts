/**
 * Demonstration of a structured Islamiyat response.
 * Educational orientation only — not a mark scheme, guaranteed grade, or examiner script.
 */
export const ANSWER_STAGES = [
  {
    id: "question",
    n: "01",
    title: "Understand the question",
    body: "Separate command words from content. ‘Explain the importance of…’ asks for meaning and consequence, not a list of facts.",
    example:
      "Prompt (illustrative): ‘Explain why the Qur’an is important in the lives of Muslims.’ The task is significance, not a biography of revelation.",
  },
  {
    id: "knowledge",
    n: "02",
    title: "Identify relevant knowledge",
    body: "Select the smallest set of accurate points that actually answer the prompt — from the Qur’an, seerah, or hadith as the question requires.",
    example:
      "Relevant knowledge here includes revelation, recitation and law, and how Muslims turn to the Qur’an for belief and practice. Extra narrative that does not serve ‘importance’ is left out.",
  },
  {
    id: "evidence",
    n: "03",
    title: "Select supporting evidence",
    body: "Evidence is a precise reference or short illustration, not a long quotation used as filler.",
    example:
      "A student might note that the Qur’an is regarded as the final revealed book, and that daily prayer and legal reasoning are organised around it — if those points are part of what they have been taught.",
  },
  {
    id: "explain",
    n: "04",
    title: "Explain its significance",
    body: "Connect evidence back to the question. ‘This shows…’ is the habit: why the fact matters for the prompt.",
    example:
      "Because the Qur’an is treated as divine guidance, it shapes worship, ethics, and community life — that is the ‘importance’, not merely that the book exists.",
  },
  {
    id: "compose",
    n: "05",
    title: "Construct a coherent response",
    body: "Write in a clear sequence. SKH emphasises composition and time; the studio intends the same once digital practice is live on the LMS.",
    example:
      "A short composed shape: opening claim → two developed points with explanation → brief close. This is a teaching demonstration, not a promised mark.",
  },
] as const;
