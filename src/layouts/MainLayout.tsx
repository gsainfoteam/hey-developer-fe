import { Outlet } from "react-router";
import Header from "src/components/Header";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1340px;
  padding: 0 200px;
`;

const MainLayout = () => {
  return (
    <Container>
      <Wrapper>
        <Header />
      </Wrapper>
      <Wrapper>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </Container>
  );
};

export default MainLayout;
