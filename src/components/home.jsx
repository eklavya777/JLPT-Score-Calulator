import React from "react";
import { useNavigate } from "react-router-dom";
import japan from "../assets/image/japan.webp";
import "./home.css";


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
            <h4>Basic</h4>
            <p>Understanding of some basic Japanese.</p>
          </div>

          <div className="card" onClick={() => handleClick("N4")}>
            <h3>N4</h3>
            <h4>Elementary</h4>
            <p>Understanding of some basic Japanese.</p>
          </div>
          <div className="card" onClick={() => handleClick("N3")}>
            <h3>N3</h3>
            <h4>Intermediate</h4>
            <p>Understanding of Japanese in everyday situations.</p>
          </div>
                                                
          <div className="card" onClick={() => handleClick("N2")}>
            <h3>N2</h3>
            <h4>Pre-Advanced</h4>
            <p>Understanding of Japanese in everyday situations.</p>
          </div>

          <div className="card" onClick={() => handleClick("N1")}>
            <h3>N1</h3>
            <h4>Advanced</h4>
            <p>Understanding of Japanese in a variety of circumstances.</p>
          </div>
        </div>
      </section>

      {/* WHY CHECK SECTION */}
      <section className="why-section">
        <div className="why-image">
        <img src={japan} alt="Japan" />
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
