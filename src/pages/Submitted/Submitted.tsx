import { useNavigate } from "react-router-dom";
import { Text } from "src/components/Text";
import styled from "styled-components";

import checkIcon from "../../assets/check_icon.png";

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

const CheckIcon = styled.img.attrs({ src: checkIcon })`
  width: 9em;
  height: 9em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Submitted = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <CheckIcon />
      <Container>
        <Text fontSize="2em" fontWeight={700}>
          피드백 감사드립니다
        </Text>
        <Text fontWeight={500}>해당 사항을 검토하고 조치를 취하겠습니다.</Text>
      </Container>
      <Button onClick={() => navigate("/")}>돌아가기</Button>
    </Wrapper>
  );
};

export default Submitted;
