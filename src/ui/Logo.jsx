import styled from "styled-components";
// import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 25.6rem;

  width: auto;
`;

function Logo() {
  // const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src="src\pages\Home\src\Assets\childio-without-bg.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
