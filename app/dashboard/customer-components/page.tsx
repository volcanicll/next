"use client";

import { useState } from "react";
import CustomersTable from "@/app/ui/customers/table";
import PinInput from "@/app/ui/pinInput/pin-input";
import React from "react";
import { NumericKeyboard } from "@/app/ui/numberKeyboard";
import {
  NumericKeyboardModal,
  NumericKeyboardRandom,
} from "@/app/ui/numberKeyboard";

export default function Page() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnter = (value: string) => {
    console.log("Entered value:", value);
    // 在这里处理输入的值
  };

  const handlePinComplete = (pin: string) => {
    console.log("PIN entered:", pin);
    // 在这里处理完成的 PIN
  };

  const handleEnterNumericKeyboardModal = (value: string) => {
    console.log("Entered value:", value);
    // 在这里处理输入的值
  };

  const handleKeyPress = (num: number) => {
    console.log(`Key pressed: ${num}`);
    // 在这里处理按键逻辑
  };

  return (
    <div>
      <div>
        <h1>Enter your PIN</h1>
        <PinInput length={6} onComplete={handlePinComplete} autoFocus />
      </div>

      <div>
        <h1>Numeric Keyboard</h1>
        <NumericKeyboard onEnter={handleEnter} maxLength={6} />
      </div>

      <div>
        <h1>Numeric Keyboard Modal</h1>
        <button onClick={() => setIsKeyboardOpen(true)}>Open Keyboard</button>
        <NumericKeyboardModal
          isOpen={isKeyboardOpen}
          onClose={() => setIsKeyboardOpen(false)}
          onEnter={handleEnterNumericKeyboardModal}
          maxLength={6}
        />
      </div>

      <div>
        <input
          value={1}
          className="border-r-2"
          onClick={() => setIsModalOpen(true)}
        ></input>
        <NumericKeyboardRandom
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
