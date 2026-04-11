import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../components/firebase";
import "./mockTest.css";

function MockTestPage() {

  const { level, testId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const sectionsOrder = ["vocabulary", "grammar", "reading"];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const currentSection = sectionsOrder[currentSectionIndex];

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {

    try {

      const res = await axios.get(
        `https://jlpt-score-calulator-1.onrender.com/get-test?level=${level}&testId=${testId}`
      );

      setData(res.data);

      let initial = {};

      sectionsOrder.forEach((sec) => {
        initial[sec] = {};
      });

      setAnswers(initial);
      setLoading(false);

    } catch (err) {

      console.error(err);

    }

  };

  // SELECT ANSWER
  const handleSelect = (section, qIndex, optionIndex) => {

    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [qIndex]: optionIndex
      }
    }));

  };

  // NEXT SECTION
  const handleNext = () => {

    if (currentSectionIndex < sectionsOrder.length - 1) {

      setCurrentSectionIndex((prev) => prev + 1);
      window.scrollTo(0, 0);

    } else {

      handleSubmit();

    }

  };

  // SUBMIT TEST
  // SUBMIT TEST
const handleSubmit = async () => {

  console.log("Submit button clicked");

  try {

    const user = auth.currentUser;
    console.log("Current user:", user);

    if (!user) {
      alert("Please login first");
      return;
    }

    console.log("Sending request to backend...");

    const res = await axios.post(
      "http://localhost:5000/submit-test",
      {
        uid: user.uid,
        level,
        testId,
        userAnswers: answers
      }
    );

    console.log("API RESPONSE:", res.data);
    const { vocabCorrect = 0, grammarCorrect = 0, readingCorrect = 0, passingScore = 95 } = res.data;

    console.log("User answers:", answers);
    console.log("Correct vocab:", vocabCorrect);
    console.log("Correct grammar:", grammarCorrect);
    console.log("Correct reading:", readingCorrect);
    console.log("Passing score:", passingScore);

    // SAFE TOTALS
    const vocabTotal = data?.vocabulary?.length || 1;
    const grammarTotal = data?.grammar?.length || 1;
    const readingTotal = data?.reading?.length || 1;

    
    // JLPT SCALE SYSTEM
    const vocabScore = Math.round((vocabCorrect / vocabTotal) * 60);
    const grammarScore = Math.round((grammarCorrect / grammarTotal) * 60);
    const readingScore = Math.round((readingCorrect / readingTotal) * 60);

    const sectionScores = [
      { name: "Vocabulary", score: vocabScore || 0 },
      { name: "Grammar", score: grammarScore || 0 },
      { name: "Reading", score: readingScore || 0 }
    ];

    navigate("/result", {
      state: {
        level,
        passScore: passingScore,
        sectionScores,
        mode: "mocktest"
      }
    });

  } catch (err) {

    console.error("Submit error:", err);

  }

};

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (

    <div className="input-page">

      {/* HEADER */}
      <header className="input-header">

        <div className="input-header-left">

          <div className="input-logo">

            <span className="input-logo-circle">
              JP
            </span>

            <span>JLPT Mock</span>

          </div>

        </div>

        <div className="input-header-right">

          <span className="input-level-badge">
            {level} - {testId}
          </span>

          <button
            className="input-close"
            onClick={() => navigate("/")}
          >
            ☒
          </button>

        </div>

      </header>

      {/* MAIN */}
      <main className="input-main">

        <div className="input-card">

          <div className="input-card-head">

            <span className="input-card-icon">
              📝
            </span>

            <div>

              <h1 className="input-card-title">
                {currentSection.toUpperCase()}
              </h1>

              <p className="input-card-desc">
                Answer all questions before continuing.
              </p>

            </div>

          </div>

          {/* QUESTIONS */}

          {data[currentSection]?.map((q, qIndex) => (

            <div key={qIndex} className="input-block">

              <p className="mocktest-question">
                {qIndex + 1}. {q.question}
              </p>

              <div className="mocktest-options">

                {q.options.map((opt, i) => {

                  const selected =
                    answers[currentSection]?.[qIndex] === i;

                  return (

                    <label
                      key={i}
                      className={`mocktest-option ${selected ? "active" : ""}`}
                    >

                      <input
                        type="radio"
                        name={`${currentSection}-${qIndex}`}
                        checked={selected || false}
                        onChange={() =>
                          handleSelect(currentSection, qIndex, i)
                        }
                      />

                      {opt}

                    </label>

                  );

                })}

              </div>

            </div>

          ))}

          {/* BUTTON */}

          <div className="input-card-footer">

            <button
              className="input-btn input-btn-primary"
              onClick={handleNext}
            >
              {currentSectionIndex === sectionsOrder.length - 1
                ? "Submit Test →"
                : "Continue →"}
            </button>

          </div>

        </div>

      </main>

    </div>

  );

}

export default MockTestPage;
