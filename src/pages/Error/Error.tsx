import { useNavigate, useSearchParams } from "react-router-dom";
import { Text } from "src/components/Text";
import styled from "styled-components";

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

const ErrorIcon = styled.div`
  display: flex;
  font-size: 9em;
  line-height: normal;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
`;

const Button = styled.button`
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

const Error = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") ?? undefined;

  return (
    <Wrapper>
      <ErrorIcon>😥</ErrorIcon>
      <Container>
        <Text fontSize="2em" fontWeight={700}>
          예상치 못한 오류가 발생했어요
        </Text>
        <Text fontWeight={500}>
          다른 연락처로 알려주시면 빠르게 고쳐보겠습니다;;
        </Text>
      </Container>
      <Button onClick={() => navigate(service ? `/?service=${service}` : "/")}>
        돌아가기
      </Button>
    </Wrapper>
  );
};

export default Error;
