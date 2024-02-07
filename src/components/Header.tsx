import { Link } from "react-router-dom";
import styled from "styled-components";

import infoteamLogo from "../assets/infoteam_logo.png";
import infoteamTextLogo from "../assets/infoteam_text_logo.png";

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

const InfoteamTextLogo = styled.img.attrs({ src: infoteamTextLogo })`
  display: flex;
  height: 50%;
`;

const InfoteamTextLabelContainer = styled.div`
  display: flex;
  gap: 0.2em;
`;

const InfoteamTextSubLabelLight = styled.div`
  display: flex;
  font-size: 1em;
  font-weight: 500;
  color: #eb6263;
`;

const InfoteamTextSubLabelBold = styled(InfoteamTextSubLabelLight)`
  font-weight: 700;
`;

const Header = () => {
  return (
    <Container>
      <InfoteamLink to="https://introduce.gistory.me/">
        <LogoWrapper>
          <InfoteamLogo />
          <InfoteamTextLogo />
        </LogoWrapper>
        <InfoteamTextLabelContainer>
          <InfoteamTextSubLabelLight>총학생회</InfoteamTextSubLabelLight>
          <InfoteamTextSubLabelBold>정보국</InfoteamTextSubLabelBold>
        </InfoteamTextLabelContainer>
      </InfoteamLink>
    </Container>
  );
};

export default Header;
