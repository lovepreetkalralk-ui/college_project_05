import React from "react";
import "./App.css";

function Landing() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>Are you tired of thinking where your money goes?</h1>
        <p>Track your income & expenses easily with Expense Tracker</p>
        <a href="#login" className="btn">Get Started</a>
      </div>
      <div className="hero-image">
        <img src="/hero.png" alt="Finance illustration" />
      </div>
    </section>
  );
}

export default Landing;
