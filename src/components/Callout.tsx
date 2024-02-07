import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #f5f5f7;
  padding: 1em;
  width: 100%;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box;
  gap: 0.5em;
`;

const IconSection = styled.div`
  display: flex;
  width: 1.5em;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TextSection = styled.div`
  display: flex;
  width: 100%;
`;

interface CalloutBoxProps {
  icon?: string;
}

const Callout = ({
  icon,
  children,
}: React.PropsWithChildren<CalloutBoxProps>) => {
  return (
    <Container>
      {icon && <IconSection>{icon}</IconSection>}
      <TextSection>{children}</TextSection>
    </Container>
  );
};

export default Callout;
