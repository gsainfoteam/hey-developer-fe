import Callout from "src/components/Callout";
import EmailInput from "src/components/EmailInput";
import FeedbackInput from "src/components/FeedbackInput";
import ImageInput from "src/components/ImageInput";
import { MultipleText, Text } from "src/components/Text";
import styled from "styled-components";

import useForm from "./useForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  width: 100%;
  padding: 60px 0;
  gap: 50px;
`;

const CalloutSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const TitleSection = styled.div`
  display: flex;
  width: 100%;
`;

const SubmitButton = styled.button`
  display: flex;
  background-color: #eb6263;
  color: white;
  border: 1px none;
  font-size: 1em;
  font-weight: 700;
  padding: 0.8em 2.2em;
  border-radius: 5px;
  cursor: pointer;
  &:hover:enabled {
    border: 1px solid #eb6263;
    background-color: white;
    color: #eb6263;
  }
  &:disabled {
    background-color: gray;
  }
`;

const Submitting = styled.div`
  display: flex;
  background: linear-gradient(90deg, gray 35%, #eb6263 50%, gray 65%);
  background-size: 300% 100%;
  color: white;
  border: 1px none;
  font-size: 1em;
  font-weight: 700;
  padding: 0.8em 2.2em;
  border-radius: 5px;

  animation: gradient 1s ease-out infinite;

  @keyframes gradient {
    0% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 00%;
    }
  }
`;

const Form = () => {
  const {
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
  } = useForm();

  return (
    <>
      <Wrapper>
        <TitleSection>
          <Text fontSize="2em" fontWeight={700}>
            피드백을 남겨주세요
          </Text>
        </TitleSection>
        <CalloutSection>
          <Callout icon="🪲">
            <MultipleText>
              <Text fontWeight={400}>서비스를 이용하시다가 </Text>
              <Text fontWeight={700}>예상치 못한 버그</Text>
              <Text fontWeight={400}>
                가 발생하셔서 이용에 불편을 겪으셨나요?
              </Text>
            </MultipleText>
          </Callout>
          <Callout icon="📢">
            <MultipleText>
              <Text fontWeight={400}>서비스의 특정 부분에 </Text>
              <Text fontWeight={700}>개선이 필요</Text>
              <Text fontWeight={400}>
                해 보이는데, 이를 개발자에게 알리고 싶나요?
              </Text>
            </MultipleText>
          </Callout>
        </CalloutSection>
        <FeedbackInput
          feedback={feedback}
          onFeedbackChange={onFeedbackChange}
          maxFeedbackLength={maxFeedbackLength}
        />
        <ImageInput
          maxFileNum={maxFileNum}
          handleFileChange={handleFileChange}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleRemoveImage={handleRemoveImage}
          imagePreviews={imagePreviews}
        />
        <EmailInput email={email} onEmailChange={onEmailChange} />
        {formState === "submitting" && <Submitting>제출하는 중...</Submitting>}
        {(formState === "editing" || formState === "empty") && (
          <SubmitButton onClick={onSubmit} disabled={formState === "empty"}>
            피드백 제출하기
          </SubmitButton>
        )}
      </Wrapper>
    </>
  );
};

export default Form;
