import { Outlet } from "react-router";
import Header from "src/components/Header";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

const HeaderWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const MainLayout = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Wrapper>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </Container>
  );
};

export default MainLayout;
