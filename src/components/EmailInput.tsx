import { ChangeEvent } from "react";
import styled from "styled-components";

import { MultipleText, Text } from "./Text";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid lightgray;
  outline: none;
  border-radius: 5px;
  padding: 1em;
  line-height: 1.5em;

  &:focus {
    border: 1px solid #eb6263;
  }
  resize: none;
`;

interface EmailInputProps {
  email: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = ({ email, onEmailChange }: EmailInputProps) => {
  return (
    <Container>
      <MultipleText>
        <Text color="gray">(선택) </Text>
        <Text>
          필요한 경우, 이메일을 입력해 주시면 해당 문제에 관해서
          안내드리겠습니다.
        </Text>
      </MultipleText>
      <Input
        placeholder="이메일 주소 (선택 사항)"
        value={email}
        onChange={onEmailChange}
      />
    </Container>
  );
};

export default EmailInput;
