import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Header from '../components/Header';
import ArticleList from '../components/ArticleList';
import Buttons from '../components/Buttons';

const Home: NextPage = () => {
  return (
    <Wrap>
      <Header title="Article List" />
      <Buttons />
      <ArticleList />
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
