import { ChangeEvent } from "react";
import styled from "styled-components";

import { Text } from "./Text";
import { FeedbackType } from "./useFeedbackTypeSelect";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 8em;
  border: 1px solid lightgray;
  outline: none;
  border-radius: 5px;
  padding: 0.5em;
  line-height: 1.5em;

  &:focus {
    border: 1px solid #eb6263;
  }
  resize: none;
`;

const Counter = styled.div`
  display: flex;
  justify-content: end;
`;

const guideByType: Record<FeedbackType, string> = {
  inquiry:
    "겪으신 문제나 불편 사항을 자세히 알려주시면 인포팀에서 확인 후 답변드리겠습니다.",
  suggestion:
    "남겨주신 의견은 인포팀에서 검토하여 서비스 개선에 반영하겠습니다.",
};

const placeholderByType: Record<FeedbackType, string> = {
  inquiry: "어떤 문제를 겪으셨는지, 언제 어떤 상황이었는지 알려주세요.",
  suggestion: "어떤 부분이 어떻게 개선되면 좋을지 알려주세요.",
};

interface FeedbackInputProps {
  feedback: string;
  maxFeedbackLength: number;
  onFeedbackChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  feedbackType: FeedbackType | null;
}

const FeedbackInput = ({
  feedback,
  maxFeedbackLength,
  onFeedbackChange,
  feedbackType,
}: FeedbackInputProps) => {
  const isFull = feedback.length >= maxFeedbackLength;

  return (
    <Container>
      <Text>
        {feedbackType
          ? guideByType[feedbackType]
          : "접수해 주신 내용은 인포팀에서 검토하고 조치를 취하겠습니다."}
      </Text>
      <Input
        placeholder={
          feedbackType
            ? placeholderByType[feedbackType]
            : "피드백 내용을 입력해주세요."
        }
        value={feedback}
        onChange={onFeedbackChange}
      />
      <Counter>
        <Text fontSize="0.7em" color={isFull ? "#eb6263" : "gray"}>
          {feedback.length}
        </Text>
        <Text fontSize="0.7em" color={isFull ? "#eb6263" : "gray"}>
          /
        </Text>
        <Text fontSize="0.7em" color={isFull ? "#eb6263" : "gray"}>
          {maxFeedbackLength}
        </Text>
      </Counter>
    </Container>
  );
};

export default FeedbackInput;
