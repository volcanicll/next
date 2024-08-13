"use client";

import React, { useState } from "react";
import NineKeyKeyboard from "@/app/ui/numberKeyboard/NineKeyKeyboard";

const App: React.FC = () => {
  const [input, setInput] = useState("");

  const handleInput = (value: number) => {
    setInput((prev) => prev + value);
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    console.log("Submitted:", input);
    setInput("");
  };

  return (
    <div className="flex flex-col justify-center align-middle">
      <h1 className="text-center">九键输入键盘</h1>
      <input type="text" value={input} readOnly />
      <NineKeyKeyboard
        onInput={handleInput}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
