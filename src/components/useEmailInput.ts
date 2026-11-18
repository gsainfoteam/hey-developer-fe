import { ChangeEvent, useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string) => emailPattern.test(email.trim());

function useEmailInput(initialValue?: string | null) {
  const [text, setText] = useState(initialValue || "");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const isEmpty = text.trim() === "";
  const isValid = isValidEmail(text);

  return { text, onChange, isEmpty, isValid };
}

export default useEmailInput;
