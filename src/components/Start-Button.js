import React from "react";

function StartButton({ startTest }) {
  return (
    <div className="Start-Button">
      <button onClick={startTest}>Start Test</button>
    </div>
  );
}

export default StartButton;
