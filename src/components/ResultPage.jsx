import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./inputPage.css";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="results-page">
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          No result data found
        </h2>
      </div>
    );
  }

  

  // if history mode
  const attempts = data.attempts || [];

  const [index, setIndex] = useState(0);

  let level = data.level || attempts[index]?.level;
  let sectionScores = data.sectionScores || [];
  let passScore = data.passScore || 95;

 if (data.mode === "history" && attempts.length === 0){
  return (
    <div className="results-page">
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        No past results for this level
      </h2>
    </div>
  );
}

  // if showing history results
  if (attempts.length > 0) {

    const current = attempts[index];

    level = current.level;

    sectionScores = [
      { name: "Vocabulary", score: current.vocabScore },
      { name: "Grammar", score: current.grammarScore },
      { name: "Reading", score: current.readingScore }
    ];


  }

  // total score
  const totalScore = sectionScores.reduce((sum, s) => sum + (s.score || 0), 0);

  const percent = Math.round((totalScore / 180) * 100);

  const passed = totalScore >= passScore;

  const handleClose = () => {
    navigate("/");
  };

  const getIcon = (name) => {

    const n = name.toLowerCase();

    if (n.includes("vocab")) return "📒";
    if (n.includes("grammar")) return "🧩";
    if (n.includes("reading")) return "📖";

    return "📊";
  };

  return (

    <div className="results-page">

      {/* HEADER */}
      <header className="input-header">

        <div className="input-logo">
          <span className="input-logo-circle">JP</span>
          <span>JLPT Calc</span>
        </div>

      </header>

      <div className="results-container">

        {/* PASS FAIL */}
        <div className={`result-banner ${passed ? "pass" : "fail"}`}>

          <div className="trophy">
            {passed ? "🏆" : "❌"}
          </div>

          <h1>
            {passed ? "Congratulations!" : "Better Luck Next Time"}
          </h1>

          <p>
            {passed
              ? `You Likely Passed JLPT ${level}`
              : `You Did Not Reach The Passing Score`}
          </p>

        </div>

        {/* SCORE CARD */}
        <div className="score-card">

          <p className="score-label">TOTAL SCORE</p>

          <h2 className="score-number">
            {totalScore}
          </h2>

          <p className="score-sub">
            out of 180 points
          </p>

          <div className="score-bar">

            <div
              className="score-fill"
              style={{ width: `${percent}%` }}
            />

          </div>

          <div className="score-scale">
            <span>0</span>
            <span>Passing: {passScore}</span>
            <span>180</span>
          </div>

        </div>

        {/* SECTION SCORES */}
        <h3 className="section-title">
          Section Breakdown
        </h3>

        <div className="sections-grid">

          {sectionScores.map((s, i) => {

           const width = ((s.score || 0) / 60) * 100;

            return (

              <div key={i} className={`section-card card-${i}`}>

                <div className="section-header">

                  <div className="section-icon">
                    {getIcon(s.name)}
                  </div>

                  <h4>{s.name}</h4>

                  <span className="section-score">
                    {s.score}
                  </span>

                </div>

                <div className="section-bar">

                  <div
                    className="section-fill"
                    style={{ width: `${width}%` }}
                  />

                </div>

              </div>

            );

          })}

        </div>

        {/* HISTORY SLIDER */}
        {attempts.length > 0 && (

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p style={{ textAlign: "center" }}>
              Attempt Date: {
                attempts[index]?.createdAt
                  ? new Date(attempts[index].createdAt).toLocaleString()
                  : "Unknown"
              }
            </p>

            <button
              onClick={() => setIndex(index - 1)}
              disabled={index === 0}
              className="btn-light"
            >
              Previous
            </button>

            <span style={{ margin: "0 20px" }}>
              {index + 1} / {attempts.length}
            </span>

            <button
              onClick={() => setIndex(index + 1)}
              disabled={index === attempts.length - 1}
              className="btn-light"
            >
              Next
            </button>

          </div>

        )}

        {/* BUTTONS */}
        <div className="results-buttons">

          <button
            className="btn-light"
            onClick={() => navigate(-1)}
          >
            Calculate Again
          </button>

          <button
            className="btn-primary"
            onClick={handleClose}
          >
            Back to Home
          </button>

        </div>

      </div>

    </div>

  );

}

export default ResultPage;