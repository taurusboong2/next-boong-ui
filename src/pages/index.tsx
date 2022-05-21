import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';
import { useArticleList } from '../hooks/article.hook';

const Home: NextPage = () => {
  const router = useRouter();
  console.log(router);

  const page = router.query.page || undefined;
  const pageSize = router.query.pageSize || undefined;

  const { articlesData, totalSize, pageCount } = useArticleList(page, pageSize);

  console.log(articlesData);
  console.log(totalSize);
  console.log(pageCount);

  useEffect(() => {
    router.push('?page=1&pageSize=10', '/pagination?page=1&pageSize=10', { shallow: true });
  }, []);

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
