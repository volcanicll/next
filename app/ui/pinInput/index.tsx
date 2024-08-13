"use client";

import React from "react";
import PinInput from "./pin-input";

const App: React.FC = () => {
  const handlePinComplete = (pin: string) => {
    console.log("PIN entered:", pin);
    // 在这里处理完成的 PIN
  };

  return (
    <div>
      <h1>Enter your PIN</h1>
      <PinInput
        length={6}
        onComplete={handlePinComplete}
        autoFocus
        placeholder="0"
      />
    </div>
  );
};

export default App;
