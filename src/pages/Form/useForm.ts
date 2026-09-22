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

  const {
    text: email,
    onChange: onEmailChange,
    isEmpty: isEmailEmpty,
    isValid: isEmailValid,
  } = useEmailInput(searchParams.get("email"));

  const isEmailRequired = feedbackType === "inquiry";
  // 선택 입력이라도 값을 넣었다면 GIST 메일이어야 합니다.
  const isEmailInvalid = !isEmailEmpty && !isEmailValid;

  useEffect(() => {
    if (formState === "editing" || formState === "empty") {
      const isIncomplete =
        feedbackType === null ||
        feedback.trim() === "" ||
        (isEmailRequired && isEmailEmpty) ||
        isEmailInvalid;
      setFormState(isIncomplete ? "empty" : "editing");
    }
  }, [
    feedbackType,
    feedback,
    isEmailRequired,
    isEmailEmpty,
    isEmailInvalid,
    formState,
  ]);

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
    isEmailInvalid,
    onSubmit,
    formState,
  };
}

export default useForm;
