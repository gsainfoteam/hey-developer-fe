import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useEmailInput from "src/components/useEmailInput";
import useFeedbackInput from "src/components/useFeedbackInput";
import useFeedbackTypeSelect from "src/components/useFeedbackTypeSelect";
import useImageInput from "src/components/useImageInput";

function useForm() {
  const { feedbackType, onFeedbackTypeChange } = useFeedbackTypeSelect();
  const maxFeedbackLength = 10000;
  const { feedback, onFeedbackChange } = useFeedbackInput({
    maxLength: maxFeedbackLength,
  });
  const maxFileNum = 5;
  const {
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleRemoveImage,
    imagePreviews,
  } = useImageInput({
    max: maxFileNum,
  });

  const [formState, setFormState] = useState<
    "empty" | "editing" | "submitting" | "submitted" | "error"
  >("empty");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { text: email, onChange: onEmailChange } = useEmailInput(
    searchParams.get("email"),
  );

  const isEmailRequired = feedbackType === "inquiry";
  const isEmailValid = /^\S+@\S+\.\S+$/.test(email.trim());

  useEffect(() => {
    if (formState === "editing" || formState === "empty") {
      const isIncomplete =
        feedbackType === null ||
        feedback.trim() === "" ||
        (isEmailRequired && !isEmailValid);
      setFormState(isIncomplete ? "empty" : "editing");
    }
  }, [feedbackType, feedback, isEmailRequired, isEmailValid, formState]);

  const onSubmit = async () => {
    setFormState("submitting");
    const service = searchParams.get("service") ?? undefined;
    try {
      const response = await fetch("https://api.cs.gistory.me/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: service,
          feedback: feedback,
          photos: imagePreviews,
          email: email,
        }),
      });
      console.log(response.ok);
      if (!response.ok) throw new Error("api error");
      setFormState("submitted");
      navigate(service ? `/submitted/?service=${service}` : "/submitted");
    } catch {
      setFormState("error");
      navigate(service ? `/error/?service=${service}` : "/error");
    }
  };

  return {
    feedbackType,
    onFeedbackTypeChange,
    feedback,
    maxFeedbackLength,
    onFeedbackChange,
    maxFileNum,
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleRemoveImage,
    imagePreviews,
    email,
    onEmailChange,
    isEmailRequired,
    onSubmit,
    formState,
  };
}

export default useForm;
