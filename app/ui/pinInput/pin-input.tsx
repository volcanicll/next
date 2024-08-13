import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
  disabled?: boolean;
  placeholder?: string;
  mask?: boolean;
  maskChar?: string;
  autoFocus?: boolean;
}

const isValidInput = (value: string): boolean => {
  return /^\d*$/.test(value);
};

const PinInput: React.FC<PinInputProps> = ({
  length = 4,
  onComplete,
  disabled = false,
  placeholder = "",
  mask = false,
  maskChar = "•",
  autoFocus = false,
}) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleComplete = (newPin: string[]) => {
    if (newPin.every((digit) => digit !== "")) {
      inputRefs.current[length - 1]?.blur();
      setFocusedIndex(null); // 确保在完成时取消所有焦点
      if (onComplete) {
        onComplete(newPin.join(""));
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isValidInput(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        handleComplete(newPin);
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const validDigits = pastedData.replace(/\D/g, "").slice(0, length);
    const newPin = [...pin];
    for (let i = 0; i < length; i++) {
      if (i < validDigits.length) {
        newPin[i] = validDigits[i];
      } else {
        newPin[i] = "";
      }
    }
    setPin(newPin);

    setTimeout(() => {
      if (validDigits.length >= length) {
        // 当粘贴的值超出或等于输入框个数时，取消所有输入框的焦点
        inputRefs.current.forEach((ref) => ref?.blur());
        setFocusedIndex(null);
      } else {
        // 否则，聚焦于第一个空白输入框
        const firstEmptyIndex = newPin.findIndex((digit) => digit === "");
        if (firstEmptyIndex !== -1) {
          inputRefs.current[firstEmptyIndex]?.focus();
        } else {
          inputRefs.current[length - 1]?.blur();
          setFocusedIndex(null);
        }
      }
      handleComplete(newPin);
    }, 0);
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {pin.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type={mask ? "password" : "text"}
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={mask && digit && index !== focusedIndex ? maskChar : digit}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(index, e)
          }
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "18px",
            // fontWeight: "lighter",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: disabled ? "#f0f0f0" : "white",
          }}
          aria-label={`PIN digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default PinInput;
