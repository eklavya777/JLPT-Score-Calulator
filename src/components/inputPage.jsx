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

  const [step, setStep] = useState(0);

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

  // RESET WHEN LEVEL CHANGES
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

  }, [level]);

  const section = sections[step];
  const totalSteps = sections.length;

  const progressPercent = Math.round((step / (totalSteps - 1)) * 100);

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

  // 🔥 CALCULATE RESULT + REDIRECT
  function handleContinue() {

    if (step < totalSteps - 1) {
      setStep(step + 1);
      return;
    }

    // JLPT SCALE CALCULATION
    const sectionScores = sections.map((sec) => {

      let correctTotal = 0;
      let questionTotal = 0;

      sec.parts.forEach((part, idx) => {

        const correct = answers[sec.id][idx] || 0;

        correctTotal += correct;
        questionTotal += part.questions;

      });

      const score = Math.round((correctTotal / questionTotal) * 60);

      return {
        name: sec.title,
        score
      };

    });

    navigate("/result", {
      state: {
        level,
        passScore,
        sectionScores,
        mode: "calculator"
      }
    });

  }

  function handleClose() {
    navigate("/");
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

      {/* MAIN */}

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
              {step === totalSteps - 1
                ? "Show Result →"
                : section.nextButtonText + " →"}
            </button>

          </div>

        </div>

      </main>

    </div>

  );

}

export default InputPage;