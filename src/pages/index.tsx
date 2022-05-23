import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useArticleList } from '../hooks/article.hook';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';

type PaginationType = {
  page?: number | string | string[] | undefined;
  pageSize?: number | string | string[] | undefined;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [pageValue, setPageValue] = useState<any>(1);
  const [pageSizeValue, setPageSizeValue] = useState<any>(10);

  const { page, pageSize } = router.query;

  const { articlesData, totalSize, pageCount } = useArticleList(page, pageSize);

  useEffect(() => {
    if (!router.isReady) return;
    router.push(`/?page=1&pageSize=10`, `/pagination?page=1&pageSize=10`, { shallow: true });
  }, []);

  useEffect(() => {
    if (router && router.query) {
      setPageValue(page);
      setPageSizeValue(pageSize);
      router.push(
        `/?page=${pageValue}&pageSize=${pageSizeValue}`,
        `/pagination?page=${pageValue}&pageSize=${pageSizeValue}`,
        { shallow: true }
      );
    }
  }, []);

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
