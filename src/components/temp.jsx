import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  function handleClick(level) {
    navigate(`/input/${level}`);
  };

  return (
    <div className="home">
     
      {/* HEADER */}
      <header className="header">
        <div className="logo">JLPT Calc</div>
      </header>
                                                 
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Select Your JLPT Level</h1>
        <p>Choose the level to calculate your estimated score.</p>

        <div className="levels">
          <div className="card" onClick={() => handleClick("N5")}>
            <h3>N5</h3>
            <p>Basic</p>
          </div>

          <div className="card" onClick={() => handleClick("N4")}>
            <h3>N4</h3>
            <p>Elementary</p>
          </div>
          <div className="card" onClick={() => handleClick("N3")}>
            <h3>N3</h3>
            <p>Intermediate</p>
          </div>
                                                
          <div className="card" onClick={() => handleClick("N2")}>
            <h3>N2</h3>
            <p>Pre-Advanced</p>
          </div>

          <div className="card" onClick={() => handleClick("N1")}>
            <h3>N1</h3>
            <p>Advanced</p>
          </div>
        </div>
      </section>

      {/* WHY CHECK SECTION */}
      <section className="why-section">
        <div className="why-image">
          <img
            src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c"
            alt="Japan"
          />
        </div>

        <div className="why-text">
          <h2>Why Check Your Score?</h2>

          <div className="feature">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <h4>Instant Feedback</h4>
              <p>Get immediate estimate instead of waiting months.</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">📊</div>
            <div className="feature-content">
              <h4>Sectional Breakdown</h4>
              <p>Understand strengths in Vocabulary, Grammar and Reading.</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">🎯</div>
            <div className="feature-content">
              <h4>Plan Your Next Step</h4>
              <p>Know whether to retake or move to the next level.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;