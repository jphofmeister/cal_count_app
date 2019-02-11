import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyle = styled.header`
  width: 100%;
  background-color: white;
  padding: 1% 3%;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  font-weight: 700;
  border-top: solid 2px #1A9972;
`;

const LogoText = styled(Link)`
  color: #524e4d;
  letter-spacing: 3px;

  :hover {
    color: #524e4d;
    text-decoration: none;
    letter-spacing: 5px;
    transition: all .1s ease-in-out;
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <nav>
        <LogoText to="/">
          CAL-COUNT-APP
        </LogoText>
      </nav >
    </HeaderStyle>
  );
}

export default Header;