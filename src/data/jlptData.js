/**
 * JLPT Master Data (Array Version)
 * Each item represents one level
 */

export const jlptData = [
    {
      level: "N5",
      passScore: 80,
      sections: [
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
      ],
    },
  
    {
      level: "N4",
      passScore: 90,
      sections: [
        {
          id: "vocabulary",
          title: "Language Knowledge (Vocabulary)",
          nextButtonText: "Continue to Grammar & Reading",
          parts: [
            { name: "Question 1", questions: 7, marksEach: 1 },
            { name: "Question 2", questions: 5, marksEach: 1 },
            { name: "Question 3", questions: 8, marksEach: 1 },
            { name: "Question 4", questions: 4, marksEach: 2 },
            { name: "Question 5", questions: 4, marksEach: 2 },
          ],
        },
        {
          id: "grammar_reading",
          title: "Language Knowledge (Grammar & Reading)",
          nextButtonText: "Continue to Listening",
          parts: [
            { name: "Question 1", questions: 13, marksEach: 1 },
            { name: "Question 2", questions: 4, marksEach: 1 },
            { name: "Question 3", questions: 4, marksEach: 1.5 },
            { name: "Question 4", questions: 3, marksEach: 7 },
            { name: "Question 5", questions: 3, marksEach: 7 },
            { name: "Question 6", questions: 2, marksEach: 9 },
          ],
        },
        {
          id: "listening",
          title: "Listening",
          nextButtonText: "See my score",
          parts: [
            { name: "Question 1", questions: 8, marksEach: 2 },
            { name: "Question 2", questions: 7, marksEach: 2 },
            { name: "Question 3", questions: 5, marksEach: 4 },
            { name: "Question 4", questions: 8, marksEach: 1.5 },
          ],
        },


      ],
    },

    {
      level: "N3",
      passScore: 95,
      sections: [
        {
          id: "vocabulary",
          title: "Language Knowledge (Vocabulary)",
          nextButtonText: "Continue to Grammar & Reading",
          parts: [
            { name: "Kanji Reading", questions: 8, marksEach: 1 },
            { name: "Word Formation", questions: 6, marksEach: 1 },
            { name: "Contextual Usage", questions: 11, marksEach: 1 },
            { name: "Paraphrasing", questions: 5, marksEach: 1 },
          ],
        },
        {
          id: "grammar_reading",
          title: "Language Knowledge (Grammar & Reading)",
          nextButtonText: "Continue to Listening",
          parts: [
            { name: "Sentence Grammar", questions: 13, marksEach: 1 },
            { name: "Text Grammar", questions: 5, marksEach: 1 },
            { name: "Short Passages", questions: 4, marksEach: 5 },
            { name: "Medium Passages", questions: 3, marksEach: 6 },
            { name: "Long Passage", questions: 1, marksEach: 10 },
          ],
        },
        {
          id: "listening",
          title: "Listening",
          nextButtonText: "See my score",
          parts: [
            { name: "Task-based Listening", questions: 6, marksEach: 2 },
            { name: "Point Comprehension", questions: 6, marksEach: 2 },
            { name: "Summary Comprehension", questions: 5, marksEach: 3 },
            { name: "Quick Response", questions: 9, marksEach: 1 },
          ],
        },
      ],
    },

    {
      level: "N2",
      passScore: 90,
      sectionPassScore: 19,
      sections: [
        {
          id: "language_knowledge",
          title: "Language Knowledge (Vocabulary & Grammar)",
          nextButtonText: "Continue to Reading",
          parts: [
            // Vocabulary
            { name: "Question 1", questions: 5, marksEach: 1 },
            { name: "Question 2", questions: 5, marksEach: 1 },
            { name: "Question 3", questions: 3, marksEach: 1 },
            { name: "Question 4", questions: 7, marksEach: 1 },
            { name: "Question 5", questions: 5, marksEach: 1 },
            { name: "Question 6", questions: 5, marksEach: 2 },
    
            // Grammar
            { name: "Question 7", questions: 12, marksEach: 1 },
            { name: "Question 8", questions: 5, marksEach: 1 },
            { name: "Question 9", questions: 4, marksEach: 2 },
          ],
        },
        {
          id: "reading",
          title: "Reading",
          nextButtonText: "Continue to Listening",
          parts: [
            { name: "Question 10", questions: 5, marksEach: 3 },
            { name: "Question 11", questions: 8, marksEach: 2.5 },
            { name: "Question 12", questions: 2, marksEach: 3 },
            { name: "Question 13", questions: 3, marksEach: 3.5 },
            { name: "Question 14", questions: 2, marksEach: 4 },
          ],
        },
        {
          id: "listening",
          title: "Listening",
          nextButtonText: "See my score",
          parts: [
            { name: "Question 1", questions: 5, marksEach: 2 },
            { name: "Question 2", questions: 6, marksEach: 2 },
            { name: "Question 3", questions: 5, marksEach: 2.5 },
            { name: "Question 4", questions: 11, marksEach: 1.5 },
            { name: "Question 5", questions: 3, marksEach: 3 },
          ],
        },
      ],
    },

    {
      level: "N1",
      passScore: 100,
      sectionPassScore: 19,
      sections: [
        {
          id: "language_knowledge",
          title: "Language Knowledge (Vocabulary & Grammar)",
          nextButtonText: "Continue to Reading",
          parts: [
            // Vocabulary
            { name: "Question 1", questions: 5, marksEach: 1 },
            { name: "Question 2", questions: 5, marksEach: 1 },
            { name: "Question 3", questions: 5, marksEach: 1 },
            { name: "Question 4", questions: 6, marksEach: 1 },
            { name: "Question 5", questions: 5, marksEach: 1 },
            { name: "Question 6", questions: 5, marksEach: 2 },
    
            // Grammar
            { name: "Question 7", questions: 10, marksEach: 1 },
            { name: "Question 8", questions: 5, marksEach: 1 },
            { name: "Question 9", questions: 4, marksEach: 2 },
          ],
        },
        {
          id: "reading",
          title: "Reading",
          nextButtonText: "Continue to Listening",
          parts: [
            { name: "Question 10", questions: 4, marksEach: 3 },
            { name: "Question 11", questions: 7, marksEach: 2.5 },
            { name: "Question 12", questions: 3, marksEach: 3 },
            { name: "Question 13", questions: 3, marksEach: 3.5 },
            { name: "Question 14", questions: 2, marksEach: 4 },
          ],
        },
        {
          id: "listening",
          title: "Listening",
          nextButtonText: "See my score",
          parts: [
            { name: "Question 1", questions: 6, marksEach: 2 },
            { name: "Question 2", questions: 6, marksEach: 2 },
            { name: "Question 3", questions: 5, marksEach: 2.5 },
            { name: "Question 4", questions: 12, marksEach: 1.5 },
            { name: "Question 5", questions: 3, marksEach: 3 },
          ],
        },
      ],
    }



  ];