import { ChangeEvent, useState } from "react";

function useEmailInput(initialValue?: string | null) {
  const [text, setText] = useState(initialValue || "");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return { text, onChange };
}

export default useEmailInput;
