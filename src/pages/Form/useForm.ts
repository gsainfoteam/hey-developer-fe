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
  const {
    text: email,
    onChange: onEmailChange,
    setText: setEmail,
  } = useEmailInput();

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

  useEffect(() => {
    setEmail(searchParams.get("email") ?? "");
  }, [searchParams, setEmail]);

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
