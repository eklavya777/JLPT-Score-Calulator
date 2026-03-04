/**
 * N5 score sheet data (like the official sheet).
 * Each section has question types: name, number of questions, marks per question.
 */

export const n5Sections = [
  {
    id: "vocabulary",
    title: "Language Knowledge (Vocabulary)",
    nextButtonText: "Continue to Grammar",
    parts: [
      { name: "Kanji Reading", questions: 7, marksEach: 2 },
      { name: "Contextual Usage", questions: 5, marksEach: 2 },
      { name: "Synonym / Paraphrase", questions: 6, marksEach: 2 },
      { name: "Word Usage", questions: 3, marksEach: 2 },
    ],
  },
  {
    id: "grammar",
    title: "Language Knowledge (Grammar)",
    nextButtonText: "Continue to Reading",
    parts: [
      { name: "Sentence Grammar 1", questions: 9, marksEach: 1 },
      { name: "Sentence Grammar 2", questions: 4, marksEach: 1 },
      { name: "Text Grammar", questions: 4, marksEach: 1 },
    ],
  },
  {
    id: "reading",
    title: "Language Knowledge (Reading)",
    nextButtonText: "Continue to Listening",
    parts: [
      { name: "Short Passages", questions: 2, marksEach: 10 },
      { name: "Medium Passages", questions: 2, marksEach: 10 },
      { name: "Long Passage", questions: 1, marksEach: 20 },
    ],
  },
  {
    id: "listening",
    title: "Listening",
    nextButtonText: "See my score",
    parts: [
      { name: "Task-based", questions: 7, marksEach: 2 },
      { name: "Point Comprehension", questions: 6, marksEach: 2.5 },
      { name: "Utterance Expressions", questions: 5, marksEach: 3 },
      { name: "Quick Response", questions: 6, marksEach: 2.5 },
    ],
  },
];
