import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./userChoice.css";

import { auth, provider, db } from "../components/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import axios from "axios";
import kanjiBg from "../assets/image/kanjis.png"; // background image

function UserChoice() {

  const { level } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // GOOGLE LOGIN
  const loginWithGoogle = async () => {
    try {

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

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  const handleOptionClick = (option) => {
    if (option === "mock") {
      navigate(`/test-choice/${level}`);
    } else if (option === "calculate") {
      navigate(`/input/${level}`);
    }
  };

  const handlePastResults = async () => {

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      const res = await axios.get(
        `https://jlpt-backend.onrender.com/get-attempts/${user.uid}`
      );

      const filteredAttempts = res.data.attempts.filter(
        attempt => attempt.level === level
      );

      navigate("/result", {
        state: {
          mode: "history",
          attempts: filteredAttempts
        }
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (

    <div
      className="user-choice-page"
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

        <h1>You've selected JLPT {level}</h1>
        <p>What would you like to do next?</p>

        <div className="choices">

          <button
            className="choice-chip"
            onClick={() => handleOptionClick("mock")}
          >
            <h3>MT</h3>
            <h4>Mock Test</h4>
            <p>Practice with timed test questions</p>
          </button>

          <button
            className="choice-chip"
            onClick={() => handleOptionClick("calculate")}
          >
            <h3>CR</h3>
            <h4>Calculate Result</h4>
            <p>Estimate your JLPT score</p>
          </button>

          <button
            className="choice-btn"
            onClick={handlePastResults}
          >
            <h3>PR</h3>
            <h4>Past Results</h4>
            <p>View your test history</p>
          </button>

        </div>

      </section>

    </div>

  );
}

export default UserChoice;
