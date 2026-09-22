import { useState } from "react";

export type FeedbackType = "inquiry" | "suggestion";

function useFeedbackTypeSelect(initialValue: FeedbackType | null = null) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(
    initialValue,
  );

  const onFeedbackTypeChange = (type: FeedbackType) => {
    setFeedbackType(type);
  };

  return { feedbackType, onFeedbackTypeChange };
}

export default useFeedbackTypeSelect;
