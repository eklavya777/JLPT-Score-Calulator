import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import japan from "../assets/image/Japan.webp";
import kanjiBg from "../assets/image/kanjis.png";
import "./home.css";

import { auth, provider, db } from "../components/firebase";

import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

function Home() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // detect if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Detect login state
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // handle redirect login (for mobile)
    getRedirectResult(auth)
      .then(async (result) => {

        if (result && result.user) {

          const user = result.user;

          await setDoc(
            doc(db, "users", user.uid),
            {
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              createdAt: new Date()
            },
            { merge: true }
          );

        }

      })
      .catch((err) => {
        console.error("Redirect login error:", err);
      });

    return () => unsubscribe();

  }, []);

  // GOOGLE LOGIN
  const loginWithGoogle = async () => {

    try {

      if (isMobile) {

        // mobile uses redirect
        await signInWithRedirect(auth, provider);

      } else {

        // desktop uses popup
        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        await setDoc(
          doc(db, "users", user.uid),
          {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            createdAt: new Date()
          },
          { merge: true }
        );

      }

    } catch (err) {

      console.error("Login error:", err);

    }

  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  function handleClick(level) {

    if (!user) {
      alert("Please login first");
      return;
    }

    navigate(`/user-choice/${level}`);

  }

  return (

    <div
      className="home"
      style={{ backgroundImage: `url(${kanjiBg})` }}
    >

      {/* HEADER */}

      <header className="header">

        <div className="logo">JLPT Calc</div>

        <div className="auth">

          {user ? (
            <>
              <span className="user-name">
                Hello {user.displayName} 👋
              </span>

              <button className="auth-btn logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button className="auth-btn login" onClick={loginWithGoogle}>
              Sign in with Google
            </button>
          )}

        </div>

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