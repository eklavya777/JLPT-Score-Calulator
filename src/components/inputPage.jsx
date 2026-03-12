import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jlptData } from "../data/jlptData";
import "./inputPage.css";

function InputPage() {

  const { level } = useParams();
  const navigate = useNavigate();

  const levelData = jlptData.find((item) => item.level === level);

  if (!levelData) {
    return (
      <div className="input-page">
        <p>This level is not ready yet.</p>
        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const { sections, passScore } = levelData;

  /* FIXED: step starts from 0 */
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const [answers, setAnswers] = useState(() => {

    const start = {};

    sections.forEach((section) => {
      start[section.id] = {};

      section.parts.forEach((_, index) => {
        start[section.id][index] = 0;
      });
    });

    return start;
  });

  /* RESET WHEN LEVEL CHANGES */

  useEffect(() => {

    const reset = {};

    sections.forEach((section) => {

      reset[section.id] = {};

      section.parts.forEach((_, index) => {
        reset[section.id][index] = 0;
      });

    });

    setAnswers(reset);
    setStep(0);
    setShowResults(false);

  }, [level]);

  const section = sections[step];
  const totalSteps = sections.length;

  /* FIXED PROGRESS FORMULA */

  const progressPercent = Math.round(((step) / (totalSteps-1)) * 100);
 

  function updateCorrect(sectionId, partIndex, newValue) {

    const max = section.parts[partIndex].questions;

    if (newValue < 0) newValue = 0;
    if (newValue > max) newValue = max;

    setAnswers((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [partIndex]: newValue,
      },
    }));

  }

  function handleContinue() {

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } 
    else {
      setShowResults(true);
    }

  }

  function handleClose() {
    navigate("/");
  }

  /* ICON FUNCTION */

  const getSectionIcon = (name) => {

    const lower = name.toLowerCase();

    if (lower.includes("vocabulary")) return "📒";
    if (lower.includes("grammar")) return "🧩";
    if (lower.includes("reading")) return "📖";
    if (lower.includes("listening")) return "🎧";

    return "📊";

  };

  // ================= RESULTS SCREEN =================

  if (showResults) {

    let totalScore = 0;

    const sectionScores = sections.map((sec) => {

      let sectionTotal = 0;

      sec.parts.forEach((part, idx) => {

        const correct = answers[sec.id][idx] || 0;
        sectionTotal += correct * part.marksEach;

      });

      totalScore += sectionTotal;

      return {
        name: sec.title,
        score: sectionTotal,
      };

    });

    const passed = totalScore >= passScore;
    const percent = Math.round((totalScore / 180) * 100);

    return (

      <div className="results-page">

        <header className="input-header">

          <div className="input-logo">
            <span className="input-logo-circle">JP</span>
            <span>JLPT Calc</span>
          </div>

        </header>

        <div className="results-container">

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

          <h3 className="section-title">
            Section Breakdown
          </h3>

          <div className="sections-grid">

            {sectionScores.map((s, i) => (

              <div key={s.name} className={`section-card card-${i}`}>

                <div className="section-header">

                  <div className="section-icon">
                    {getSectionIcon(s.name)}
                  </div>

                  <div>
                    <h4>{s.name}</h4>
                  </div>

                  <span className="section-score">
                    {s.score}
                  </span>

                </div>

                <div className="section-bar">

                  <div
                    className="section-fill"
                    style={{
                      width: `${(s.score / 60) * 100}%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

          <div className="results-buttons">

            <button
              className="btn-light"
              onClick={() => window.location.reload()}
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

  // ================= INPUT PAGE =================

  return (

    <div className="input-page">

      <header className="input-header">

        <div className="input-header-left">

          <div className="input-logo">

            <span className="input-logo-circle">
              JP
            </span>

            <span>JLPT Calc</span>

          </div>

          <div className="input-progress-wrap">

            <div className="input-progress-label">

              <span>Overall Progress</span>

              <span>{progressPercent}%</span>

            </div>

            <div className="input-progress-bar">

              <div
                className="input-progress-fill"
                style={{
                  width: `${progressPercent}%`
                }}
              />

            </div>

            <div className="input-step-label">

              <span>
                Step {step + 1} of {totalSteps}
              </span>

              <span>
                {section.title}
              </span>

            </div>

          </div>

        </div>

        <div className="input-header-right">

          <span className="input-level-badge">
            {level} Level
          </span>

          <button
            className="input-close"
            onClick={handleClose}
          >
            ☒
          </button>

        </div>

      </header>

      <main className="input-main">

        <div className="input-card">

          <div className="input-card-head">

            <span className="input-card-icon">
              📖
            </span>

            <div>

              <h1 className="input-card-title">
                {section.title}
              </h1>

              <p className="input-card-desc">
                Enter the number of questions you answered correctly.
              </p>

            </div>

          </div>

          {section.parts.map((part, partIndex) => {

            const correct = answers[section.id][partIndex] ?? 0;
            const max = part.questions;
            const totalMarks = part.questions * part.marksEach;

            return (

              <div key={partIndex} className="input-block">

                <h3 className="input-block-title">
                  Question {partIndex + 1}: {part.name}
                </h3>

                <p className="input-block-meta">
                  {part.questions} × {part.marksEach} = {totalMarks} marks
                </p>

                <div className="input-block-controls">

                  <input
                    type="range"
                    min="0"
                    max={max}
                    value={correct}
                    onChange={(e) =>
                      updateCorrect(
                        section.id,
                        partIndex,
                        Number(e.target.value)
                      )
                    }
                    className="input-slider"
                  />

                  <span className="input-block-count">
                    {correct}/{max}
                  </span>

                  <button
                    className="input-btn input-btn-small"
                    onClick={() =>
                      updateCorrect(
                        section.id,
                        partIndex,
                        correct - 1
                      )
                    }
                    disabled={correct <= 0}
                  >
                    −
                  </button>

                  <button
                    className="input-btn input-btn-small"
                    onClick={() =>
                      updateCorrect(
                        section.id,
                        partIndex,
                        correct + 1
                      )
                    }
                    disabled={correct >= max}
                  >
                    +
                  </button>

                </div>

              </div>

            );

          })}

          <div className="input-card-footer">

            <button
              className="input-btn input-btn-primary"
              onClick={handleContinue}
            >
              {section.nextButtonText} →
            </button>

          </div>

        </div>

      </main>

    </div>

  );

}

export default InputPage;