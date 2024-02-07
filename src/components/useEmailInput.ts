import { ChangeEvent, useState } from "react";

function useEmailInput() {
  const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return { text, onChange };
}

export default useEmailInput;
