import { ChangeEvent, useState } from "react";

interface useTextInputProps {
  maxLength: number;
}

function useFeedbackInput({ maxLength }: useTextInputProps) {
  const [feedback, setFeedback] = useState("");
  const onFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value.slice(0, maxLength));
  };

  return { feedback, onFeedbackChange };
}

export default useFeedbackInput;
