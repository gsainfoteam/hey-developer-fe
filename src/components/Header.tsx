import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import infoteamLogo from "../assets/logo.svg";

const Container = styled.div`
  width: 100%;
  height: 30px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  border-bottom: 1px solid lightgray;
`;

const InfoteamLink = styled(Link)`
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
  gap: 1em;
  text-decoration: none;
`;

const LogoWrapper = styled.div`
  display: flex;
  height: 100%;
  gap: 3px;
  align-items: center;
`;

const InfoteamLogo = styled.img.attrs({ src: infoteamLogo })`
  display: flex;
  height: 100%;
`;

const Header = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") ?? undefined;

  return (
    <Container>
      <InfoteamLink to={service ? `/?service=${service}` : "/"}>
        <LogoWrapper>
          <InfoteamLogo />
        </LogoWrapper>
      </InfoteamLink>
    </Container>
  );
};

export default Header;
