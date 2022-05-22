import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';

const Home: NextPage = () => {
  const router = useRouter();
  const [pageValue, setPageValue] = useState(1);
  const [pageSizeValue, setPageSIzeValue] = useState(10);

  const { page, pageSize } = router.query || undefined;

  useEffect(() => {
    if (pageSize && page) {
      return;
    }
    router.push(`?page=1&pageSize=10`, `/pagination?page=1&pageSize=10`, { shallow: true });
  }, []);

  useEffect(() => {
    router.push(`?page=${pageValue}&pageSize=${pageSizeValue}`, `/pagination?page=1&pageSize=10`, { shallow: false });
  }, [setPageValue, setPageSIzeValue]);

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
