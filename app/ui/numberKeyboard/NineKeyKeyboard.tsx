import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const ActionButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

interface NineKeyKeyboardProps {
  onInput: (value: number) => void;
  onDelete: () => void;
  onSubmit: () => void;
}

const NineKeyKeyboard: React.FC<NineKeyKeyboardProps> = ({
  onInput,
  onDelete,
  onSubmit,
}) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [lastPressed, setLastPressed] = useState<number | null>(null);

  useEffect(() => {
    setNumbers(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  }, []);

  const shuffleArray = (array: number[]): number[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleNumberClick = (num: number) => {
    setLastPressed(num);
    onInput(num);
  };

  return (
    <KeyboardWrapper>
      {numbers.map((num) => (
        <Button key={num} onClick={() => handleNumberClick(num)}>
          {num}
        </Button>
      ))}
      <ActionButton onClick={onDelete}>删除</ActionButton>
      <Button onClick={() => handleNumberClick(0)}>0</Button>
      <ActionButton onClick={onSubmit}>确定</ActionButton>
    </KeyboardWrapper>
  );
};

export default NineKeyKeyboard;
