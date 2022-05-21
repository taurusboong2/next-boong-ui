import React from 'react';
import styled from 'styled-components';

type Header = {
  title: string;
};

const Header = ({ title }: Header) => {
  return (
    <Wrap>
      <h1>{title}</h1>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  display: grid;
  min-height: 60px;
  background-color: #333;
  width: 100%;
  place-items: center;
  background: url('/images/header_image.jpg') no-repeat;

  h1 {
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
  }
`;
