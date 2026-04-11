import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./testChoice.css";
import { auth, provider, db } from "../components/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import kanjiBg from "../assets/image/kanjis.png";
import axios from "axios";

function TestChoice() {
  const { level } = useParams(); // N5, N4
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);

  // Detect login state
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
      
      // Save user in Firestore
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

  // fetch tests when page loads
  useEffect(() => {
    axios
      .get(`https://jlpt-backend.onrender.com/get-tests/${level}`)
      .then((res) => {
        setTests(res.data.tests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [level]);

  // when user clicks test
  const handleClick = (testId) => {
    navigate(`/mock-test/${level}/${testId}`);
  };

  return (

       <div
          className="user-choice-page"
          style={{ backgroundImage: `url(${kanjiBg})` }}
        >
    <div className="test-choice-page">
      
      {/* HEADER */}
      <header className="header">

        <div className="logo">JLPT Calc</div>

        <div className="auth">

          {user ? (
            <>
              <span className="user-name">
                Hello {user.displayName} &#128075;
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
        <h1>Choose Test ({level})</h1>
        <p>Select a practice test to begin</p>

        {/* if no tests */}
        {tests.length === 0 && (
          <div className="no-tests">No tests found</div>
        )}

        {/* show tests */}
        <div className="tests">
          {tests.map((test, index) => (
            <button
              key={index}
              className="test-chip"
              onClick={() => handleClick(test)}
            >
              <h3>T{index + 1}</h3>
              <h4>Test {index + 1}</h4>
              <p>{level} Practice Exam</p>
            </button>
          ))}
        </div>
      </section>

    </div>
    </div>
  );
}

export default TestChoice;
