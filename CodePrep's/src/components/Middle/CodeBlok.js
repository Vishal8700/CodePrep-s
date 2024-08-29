// src/components/CodeBlock.js
import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import "./CodeBlock.css";

const codeSnippet = `
public class FactorialCalculator {<br>
  int FactorialCalculator() {<br>
    int number = 5;<br>
    long fact = 1;<br>
    for (int i = 1; i <= number; i++) {<br>
      fact = fact * i;<br>
    }<br>
    return fact;<br>
  }<br>
  public static void main(String[] args) {<br>
    int number = 5;<br>
    long fact = 1;<br>
    FactorialCalculator factCalculator = new FactorialCalculator();<br>
    fact = factCalculator.FactorialCalculator();<br>
    System.out.println("Factorial of " + number + " is: " + fact);<br>
  }
}
`;

const output = `
Factorial of 5 is: 120
`;

const CodeBlock = () => {
  const [showOutput, setShowOutput] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    // Display output after typing is done
    if (typingComplete) {
      const timer = setTimeout(() => {
        setShowOutput(false); // Hide output after 2 seconds
        setTypingComplete(false); // Reset typing complete state
      }, 2000); // Adjust timing as needed
      return () => clearTimeout(timer);
    }
  }, [typingComplete]);

  const handleTypingComplete = () => {
    setTypingComplete(true); // Set typing complete state
    setShowOutput(true); // Show output immediately
  };

  return (
    <div>
      <ReactTyped
        strings={[codeSnippet]}
        typeSpeed={50}
        backSpeed={0}
        showCursor={false}
        onComplete={handleTypingComplete} // Call function when typing is complete
      />
      {showOutput && <pre style={{ marginTop: "1rem", color: "#50fa7b" }}>{output}</pre>}
    </div>
  );
};

export default CodeBlock;