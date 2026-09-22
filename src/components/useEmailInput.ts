import { ChangeEvent, useState } from "react";

// 인포팀 계정 프로바이더에 등록된 GIST 메일(예: id@gm.gist.ac.kr, id@gist.ac.kr)만 허용합니다.
const gistEmailPattern = /^[^\s@]+@([^\s@]+\.)?gist\.ac\.kr$/i;

export const isGistEmail = (email: string) =>
  gistEmailPattern.test(email.trim());

function useEmailInput(initialValue?: string | null) {
  const [text, setText] = useState(initialValue || "");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const isEmpty = text.trim() === "";
  const isValid = isGistEmail(text);

  return { text, onChange, isEmpty, isValid };
}

export default useEmailInput;
