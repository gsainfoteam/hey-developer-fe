import styled from "styled-components";

import { Text } from "./Text";
import { FeedbackType } from "./useFeedbackTypeSelect";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const OptionGroup = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
  gap: 0.75em;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  background-color: ${({ $selected }) => ($selected ? "#fdf1f1" : "#f5f5f7")};
  border: 1px solid
    ${({ $selected }) => ($selected ? "#eb6263" : "transparent")};
  border-radius: 5px;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? "#eb6263" : "lightgray")};
  }

  &:focus-visible {
    outline: 2px solid #eb6263;
    outline-offset: 2px;
  }
`;

const Indicator = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-shrink: 0;
  width: 1.1em;
  height: 1.1em;
  box-sizing: border-box;
  border-radius: 50%;
  border: ${({ $selected }) =>
    $selected ? "0.35em solid #eb6263" : "2px solid lightgray"};
  background-color: white;
  transition: border 0.15s ease;
`;

const TextSection = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
`;

interface FeedbackTypeOption {
  type: FeedbackType;
  icon: string;
  title: string;
  description: string;
}

const options: FeedbackTypeOption[] = [
  {
    type: "inquiry",
    icon: "🙋",
    title: "문의하기",
    description: "이용 중 겪은 문제나 불편에 대해 답변이나 해결을 원해요.",
  },
  {
    type: "suggestion",
    icon: "📢",
    title: "개선 제안",
    description: "더 나은 서비스를 위한 의견이나 아이디어를 전하고 싶어요.",
  },
];

interface FeedbackTypeSelectProps {
  feedbackType: FeedbackType | null;
  onFeedbackTypeChange: (type: FeedbackType) => void;
}

const FeedbackTypeSelect = ({
  feedbackType,
  onFeedbackTypeChange,
}: FeedbackTypeSelectProps) => {
  return (
    <Container>
      <Text>무엇을 도와드릴까요?</Text>
      <OptionGroup role="radiogroup" aria-label="피드백 종류">
        {options.map(({ type, icon, title, description }) => {
          const selected = feedbackType === type;
          return (
            <Option
              key={type}
              type="button"
              role="radio"
              aria-checked={selected}
              $selected={selected}
              onClick={() => onFeedbackTypeChange(type)}
            >
              <Indicator $selected={selected} aria-hidden="true" />
              <TextSection>
                <Title>
                  <Text fontWeight={700}>{title}</Text>
                  <Text aria-hidden="true">{icon}</Text>
                </Title>
                <Text fontSize="0.85em" fontWeight={400} color="#6e6e73">
                  {description}
                </Text>
              </TextSection>
            </Option>
          );
        })}
      </OptionGroup>
    </Container>
  );
};

export default FeedbackTypeSelect;
