import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface NumericKeyboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyPress: (value: number) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ActionButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

const NumericKeyboardModal: React.FC<NumericKeyboardModalProps> = ({
  isOpen,
  onClose,
  onKeyPress,
}) => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      setNumbers(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    }
  }, [isOpen]);

  const shuffleArray = (array: number[]): number[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleNumberClick = (num: number) => {
    onKeyPress(num);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <KeyboardWrapper>
          {numbers.map((num) => (
            <Button key={num} onClick={() => handleNumberClick(num)}>
              {num}
            </Button>
          ))}
          <ActionButton >删除</ActionButton>
          <Button onClick={() => handleNumberClick(0)}>0</Button>
          <ActionButton onClick={onClose}>确定</ActionButton>
        </KeyboardWrapper>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default NumericKeyboardModal;
