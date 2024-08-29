// src/Middle.js
import React from "react";
import CodeBlock from "./CodeBlok"; // Make sure this import matches your file name
import "./Middle.css";

const Middle = () => {
  return (
    <div className="middle-container">
      <div className="middle-header">
        <h1>
          <span className="highlight">SuperCharge</span> your Technical Skills
        </h1><br></br>
        <div className="subtext">
          Dive into interview-specific problems. Elevate your skills
          and conquer technical interviews like a champ. Ready to
          level up? Let's do this together.
        </div>
      </div>

      <div className="content">
        <div className="code-block">
          <CodeBlock />
        </div>
        <div className="grid">
          <div className="card_code blue">
            <span className="icon">&lt;/&gt;</span>
            <div>
              <div>Programmings</div>
              <div>Funamentals</div>
            </div>
          </div>
          <div className="card_code green">
            <span className="icon">≡</span>
            <div>
              <div>Data</div>
              <div>Structures</div>
            </div>
          </div>
          <div className="card_code teal">
            <span className="icon">⋘</span>
            <div>
              <div>Advance</div>
              <div>Algorithm</div>
            </div>
          </div>
          <div className="card_code orange">
            <span className="icon">∑</span>
            <div>
              <div>Maths,</div>
              <div>Numbers &</div>
              <div>Theory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;