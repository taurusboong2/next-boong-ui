import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useArticleList } from '../hooks/article.hook';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';

const Home: NextPage = () => {
  const router = useRouter();
  const [pageValue, setPageValue] = useState<any>(1);
  const [pageSizeValue, setPageSizeValue] = useState<any>(10);

  const { page = 1, pageSize = 10 } = router.query;
  console.log(`page: `, page);
  console.log(`pageSize: `, pageSize);

  const { articlesData, totalSize, pageCount } = useArticleList(page, pageSize);

  useEffect(() => {
    if (router.isReady) {
      router.push(`/?page=${page}&pageSize=${pageSize}`, `/pagination?page=${page}&pageSize=${pageSize}`, {
        shallow: true,
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    router.push(`/?page=${page}&pageSize=${pageSize}`, `/pagination?page=${page}&pageSize=${pageSize}`, {
      shallow: true,
    });
  }, [page, pageSize]);

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
