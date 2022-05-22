import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useArticleList } from '../hooks/article.hook';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';

const Home: NextPage = () => {
  const router = useRouter();

  const { page, pageSize } = router.query;

  const { articlesData, totalSize, pageCount } = useArticleList(page, pageSize);

  useEffect(() => {
    if (!router.isReady) return;
    router.push(`/?page=1&pageSize=10`, `/pagination?page=1&pageSize=10`, { shallow: true });
  }, [router.isReady]);

  // useEffect(() => {
  //   if (pageSize && page) {
  //     return;
  //   }
  //   router.replace(`/${router.pathname}`, `/pagination?page=${page}&pageSize=${pageSize}`, {
  //     shallow: true,
  //   });
  // }, [page, pageSize]);

  return (
    <Wrap>
      <Header title="Article List" />
      <Buttons />
      <ArticleList data={{ articlesData, totalSize, pageCount }} />
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
