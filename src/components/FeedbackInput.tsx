import { ChangeEvent } from "react";
import styled from "styled-components";

import { Text } from "./Text";

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

interface FeedbackInputProps {
  feedback: string;
  maxFeedbackLength: number;
  onFeedbackChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const FeedbackInput = ({
  feedback,
  maxFeedbackLength,
  onFeedbackChange,
}: FeedbackInputProps) => {
  const isFull = feedback.length >= maxFeedbackLength;

  return (
    <Container>
      <Text>
        불편사항을 접수하시면 인포팀에서 해당 사항을 검토하고 조치를
        취하겠습니다.
      </Text>
      <Input
        placeholder="피드백 내용을 입력해주세요."
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
