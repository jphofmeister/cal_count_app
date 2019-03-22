import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyle = styled.header`
  width: 2rem;
  height: 100vh
  //background-color: #1A9972;
  background: rgb(21,153,117);
  background: linear-gradient(180deg, rgba(21,153,117,1) 0%, rgba(11,194,144,1) 100%);
  padding-top: .5rem;
  text-align: center;
  //box-shadow: 0 2px 4px rgba(0,0,0,.1);
  font-weight: 700;
  //border-left: solid 2px #1A9972;
  display: inline-block;
  position: fixed;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    height: 40px;
    width: 100%;
    position: relative;
  }
`;

const LogoText = styled(Link)`
  //color: #524e4d;
  color: #fff;
  letter-spacing: 3px;
  writing-mode: vertical-rl;
  text-orientation: upright;
  -webkit-font-smoothing: antialiased;

  :hover {
    //color: #524e4d;
    color: #fff;
    text-decoration: none;
    letter-spacing: 10px;
    transition: all .1s ease-in-out;
  }

  @media (max-width: 768px) {
    writing-mode: horizontal-tb;
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <nav>
        <LogoText to="/">
          CAL COUNT APP
        </LogoText>
      </nav >
    </HeaderStyle>
  );
}

export default Header;