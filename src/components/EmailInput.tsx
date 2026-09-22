import { ChangeEvent } from "react";
import styled from "styled-components";

import { MultipleText, Text } from "./Text";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input<{ $invalid: boolean }>`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ $invalid }) => ($invalid ? "#eb6263" : "lightgray")};
  outline: none;
  border-radius: 5px;
  padding: 1em;
  line-height: 1.5em;

  &:focus {
    border: 1px solid #eb6263;
  }
  resize: none;
`;

const Hint = styled.div`
  display: flex;
  justify-content: end;
`;

interface EmailInputProps {
  email: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  invalid?: boolean;
}

const EmailInput = ({
  email,
  onEmailChange,
  required = false,
  invalid = false,
}: EmailInputProps) => {
  return (
    <Container>
      {required ? (
        <MultipleText>
          <Text color="#eb6263">(필수) </Text>
          <Text>
            문의에 대한 답변을 드리기 위해 이메일이 필요합니다. 답변을 받으실
            GIST 이메일을 입력해 주세요.
          </Text>
        </MultipleText>
      ) : (
        <MultipleText>
          <Text color="gray">(선택) </Text>
          <Text>
            필요한 경우, GIST 이메일을 입력해 주시면 해당 내용에 관해서
            안내드리겠습니다.
          </Text>
        </MultipleText>
      )}
      <Input
        type="email"
        placeholder={
          required
            ? "답변 받을 GIST 이메일 주소 (예: id@gm.gist.ac.kr)"
            : "GIST 이메일 주소 (선택 사항)"
        }
        value={email}
        onChange={onEmailChange}
        required={required}
        aria-required={required}
        aria-invalid={invalid}
        $invalid={invalid}
      />
      {invalid && (
        <Hint>
          <Text fontSize="0.7em" color="#eb6263">
            gist.ac.kr로 끝나는 이메일 주소만 입력할 수 있습니다.
          </Text>
        </Hint>
      )}
    </Container>
  );
};

export default EmailInput;
