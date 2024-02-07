import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useEmailInput from "src/components/useEmailInput";
import useFeedbackInput from "src/components/useFeedbackInput";
import useImageInput from "src/components/useImageInput";

function useForm() {
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
  const { text: email, onChange: onEmailChange } = useEmailInput();

  const [formState, setFormState] = useState<
    "empty" | "editing" | "submitting" | "submitted" | "error"
  >("empty");

  useEffect(() => {
    if (formState === "editing" || formState === "empty") {
      if (feedback.trim() === "") setFormState("empty");
      else setFormState("editing");
    }
  }, [feedback, formState]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit = async () => {
    setFormState("submitting");
    try {
      const response = await fetch("https://api.cs.gistory.me/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: searchParams.get("service"),
          feedback: feedback,
          photos: imagePreviews,
          email: email,
        }),
      });
      if (!response.ok) throw new Error();
      setFormState("submitted");
      navigate("/submitted");
    } catch {
      setFormState("error");
      navigate("/error");
    }
  };

  return {
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
    onSubmit,
    formState,
  };
}

export default useForm;
