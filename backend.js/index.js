const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Firebase Setup
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_KEY)
  )
});
const db = admin.firestore();


app.get("/", (req, res) => {
  res.send("JLPT Data Insert API Running 🚀");
});


app.post("/create-test", async (req, res) => {
  try {
    const { level, testId } = req.body;

    if (!level || !testId) {
      return res.status(400).json({ error: "Missing level/testId" });
    }

    await db
      .collection("mockTests")
      .doc(level) // N5
      .collection("tests")
      .doc(testId) // test1
      .set({ createdAt: new Date() });

    res.json({ message: "Test created ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/add-questions", async (req, res) => {
  try {
    const { level, testId, section, questions } = req.body;

    if (!level || !testId || !section || !questions) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await db
      .collection("mockTests")
      .doc(level)              // N5
      .collection("tests")
      .doc(testId)             // test1
      .collection("sections")
      .doc(section)            // vocabulary / grammar / reading
      .set({ questions });

    res.json({
      message: `${section} questions added inside ${testId} (${level}) ✅`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/add-answers", async (req, res) => {
  try {
    const { level, testId, section, answers } = req.body;

    if (!level || !testId || !section || !answers) {
      return res.status(400).json({ error: "Missing fields" });
    }

   await db
      .collection("answers")
      .doc(level)              // N5
      .collection("tests")
      .doc(testId)             // test1
      .collection("sections")
      .doc(section)            // vocabulary / grammar / reading
      .set({ answers });

    res.json({
      message: `Answers added for ${testId} (${level}) ✅`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/get-tests/:level", async (req, res) => {
  try {
    // Get the level from URL (like N5, N4, etc.)
    const { level } = req.params;

    // Go to Firebase and get all tests for this level
    const testsSnapshot = await db
      .collection("mockTests")
      .doc(level)                    // Go to N5 or N4 document
      .collection("tests")           // Go to tests collection inside
      .get();                        // Get all documents

    // Create empty array to store test names
    const tests = [];
    
    // Loop through each test document we found
    testsSnapshot.forEach(doc => {
      // doc.id is the document name (like "mocktest1", "mocktest2")
      tests.push(doc.id);
    });

    // Send the array of test names back to frontend
    res.json({ tests });

  } catch (err) {
    console.error("Error getting tests:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/get-test", async (req, res) => {
  try {
    // Get level and testId from URL query parameters
    const { level, testId } = req.query;

    // Check if both parameters are provided
    if (!level || !testId) {
      return res.status(400).json({ error: "Missing level/testId" });
    }

    // Define the sections we want to fetch
    const sectionsOrder = ["vocabulary", "grammar", "reading"];
    
    // Create empty object to store all test data
    let testData = {};

    // Loop through each section (vocabulary, grammar, reading)
    for (const section of sectionsOrder) {
      // Get the specific section document from Firebase
      const sectionDoc = await db
        .collection("mockTests")
        .doc(level)                    // Go to N5 or N4
        .collection("tests")           // Go to tests collection
        .doc(testId)                   // Go to specific test (mocktest1)
        .collection("sections")        // Go to sections collection
        .doc(section)                  // Go to vocabulary/grammar/reading
        .get();                        // Get the document

      // Check if the document exists in Firebase
      if (sectionDoc.exists) {
        // If it exists, get the questions data and store it
        // sectionDoc.data() gets all data from the document
        // .questions gets just the questions array
        // || [] means if questions don't exist, use empty array
        testData[section] = sectionDoc.data().questions || [];
      }
      // If document doesn't exist, we don't add anything (user gets empty section)
    }

    // Send the complete test data back to frontend
    res.json(testData);

  } catch (err) {
    console.error("Error getting test:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// =====================================================
// ✅ SUBMIT TEST API
// =====================================================
app.post("/submit-test", async (req, res) => {
  try {

    const { uid, level, testId, userAnswers } = req.body;

    if (!uid || !level || !testId || !userAnswers) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // =========================
    // FETCH ANSWERS FROM DB
    // =========================

    const vocabDoc = await db
      .collection("answers")
      .doc(level)
      .collection("tests")
      .doc(testId)
      .collection("sections")
      .doc("vocabulary")
      .get();

    const grammarDoc = await db
      .collection("answers")
      .doc(level)
      .collection("tests")
      .doc(testId)
      .collection("sections")
      .doc("grammar")
      .get();

    const readingDoc = await db
      .collection("answers")
      .doc(level)
      .collection("tests")
      .doc(testId)
      .collection("sections")
      .doc("reading")
      .get();

 const passingScoreDoc = await db
  .collection("answers")
  .doc(level)
  .collection("tests")
  .doc("passScore")
  .get();

    const vocabAnswers = vocabDoc.data()?.answers || {};
    const grammarAnswers = grammarDoc.data()?.answers || {};
    const readingAnswers = readingDoc.data()?.answers || {};
    const passingScore = passingScoreDoc.data()?.passScore || 0;

    let vocabCorrect = 0;
    let grammarCorrect = 0;
    let readingCorrect = 0;


    // =========================
    // TOTAL QUESTIONS
    // =========================

    const vocabTotal = Object.keys(vocabAnswers).length;
    const grammarTotal = Object.keys(grammarAnswers).length;
    const readingTotal = Object.keys(readingAnswers).length;

    console.log("VOCAB TOTAL:", vocabTotal);
    console.log("GRAMMAR TOTAL:", grammarTotal);
    console.log("READING TOTAL:", readingTotal);


    // =========================
    // VOCAB CHECK
    // =========================

    Object.entries(userAnswers.vocabulary || {}).forEach(([q, userAns]) => {

      const questionNumber = Number(q) + 1;
      const correctAnswer = Number(vocabAnswers[questionNumber]);
      const userAnswer = Number(userAns) + 1;

      console.log(
        "VOCAB → Q:", questionNumber,
        "User:", userAnswer,
        "Correct:", correctAnswer
      );

      if (userAnswer === correctAnswer) {
        vocabCorrect++;
      }

    });


    Object.entries(userAnswers.grammar || {}).forEach(([q, userAns]) => {

      const questionNumber = Number(q) + 1;
      const correctAnswer = Number(grammarAnswers[questionNumber]);
      const userAnswer = Number(userAns) + 1;

      console.log(
        "GRAMMAR → Q:", questionNumber,
        "User:", userAnswer,
        "Correct:", correctAnswer
      );

      if (userAnswer === correctAnswer) {
        grammarCorrect++;
      }

    });

 

    Object.entries(userAnswers.reading || {}).forEach(([q, userAns]) => {

      const questionNumber = grammarTotal + Number(q) + 1;

      const correctAnswer = Number(readingAnswers[questionNumber]);
      const userAnswer = Number(userAns) + 1;

      console.log(
        "READING → Q:", questionNumber,
        "User:", userAnswer,
        "Correct:", correctAnswer
      );

      if (userAnswer === correctAnswer) {
        readingCorrect++;
      }

    });


    console.log("VOCAB CORRECT:", vocabCorrect);
    console.log("GRAMMAR CORRECT:", grammarCorrect);
    console.log("READING CORRECT:", readingCorrect);
    console.log("PASSING SCORE:", passingScore);


    // =========================
    // JLPT SCALE
    // =========================

    const vocabScore = Math.round((vocabCorrect / vocabTotal) * 60);
    const grammarScore = Math.round((grammarCorrect / grammarTotal) * 60);
    const readingScore = Math.round((readingCorrect / readingTotal) * 60);

    const totalScore = vocabScore + grammarScore + readingScore;


    // =========================
    // SAVE ATTEMPT
    // =========================

    await db
      .collection("users")
      .doc(uid)
      .collection("attempts")
      .add({
        level,
        testId,
        vocabScore,
        grammarScore,
        readingScore,
        totalScore,
        createdAt: new Date()
      });


    // =========================
    // RETURN RESULT
    // =========================

    res.json({
      vocabCorrect,
      grammarCorrect,
      readingCorrect,
      passingScore
    });

  } catch (err) {

    console.error("Submit test error:", err);
    res.status(500).json({ error: "Server error" });

  }
});

app.get("/get-attempts/:uid", async (req, res) => {

  try {

    const { uid } = req.params;

    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("attempts")
      .orderBy("createdAt", "desc")
      .get();

    const attempts = [];

    snapshot.forEach(doc => {
      attempts.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      });
    });

    res.json({ attempts });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Server error" });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
