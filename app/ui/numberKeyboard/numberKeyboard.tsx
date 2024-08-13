import React, { useState } from "react";
import styled from "styled-components";

interface NumericKeyboardProps {
  onEnter: (value: string) => void;
  maxLength?: number;
}

const KeyboardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 18px;
  border: none;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d0d0d0;
  }
`;

const Display = styled.div`
  grid-column: 1 / -1;
  background-color: #ffffff;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({
  onEnter,
  maxLength = 10,
}) => {
  const [value, setValue] = useState<string>("");

  const handleNumberClick = (num: number) => {
    if (value.length < maxLength) {
      setValue((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (value) {
      onEnter(value);
      setValue("");
    }
  };

  return (
    <KeyboardWrapper>
      <Display>{value || "0"}</Display>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button key={num} onClick={() => handleNumberClick(num)}>
          {num}
        </Button>
      ))}
      <Button onClick={handleDelete}>Delete</Button>
      <Button onClick={() => handleNumberClick(0)}>0</Button>
      <Button onClick={handleEnter}>Enter</Button>
    </KeyboardWrapper>
  );
};

export default NumericKeyboard;
