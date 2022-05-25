import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useArticleList } from '../hooks/article.hook';
import { GetServerSideProps } from 'next';
import { fetchArticleList } from '../networks/article';
import axios from 'axios';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';

export const getServerSideProps: GetServerSideProps = async context => {
  const { page, pageSize } = context.query;
  const res = await fetchArticleList(page, pageSize);
  const articleData = res.data;
  const articleMeta = res.meta;
  const totalSize = articleMeta.pagination.total;
  const pageCount = articleMeta.pagination.pageCount;

  return {
    props: {
      data: {
        articleData,
        totalSize,
        pageCount,
      },
    },
  };
};

const Home = ({ data }) => {
  const router = useRouter();
  const [pageValue, setPageValue] = useState<any>(1);
  const [pageSizeValue, setPageSizeValue] = useState<any>(10);

  const { articleData, totalSize, pageCount } = data;

  console.log(`아티클 데이타:`, articleData);
  console.log(`전체 게시글 개수:`, totalSize);
  console.log(`페이지 목록:`, pageCount);

  const { page = 1, pageSize = 10 } = router.query;

  useEffect(() => {
    if (router.isReady) {
      router.push(`/?page=${page}&pageSize=${pageSize}`, `/pagination?page=${page}&pageSize=${pageSize}`, {
        shallow: true,
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (pageValue && pageSizeValue) {
      return;
    }
    setPageValue(page);
    setPageSizeValue(pageSize);
    router.push(
      `/?page=${pageValue}&pageSize=${pageSizeValue}`,
      `/pagination?page=${pageValue}&pageSize=${pageSizeValue}`,
      {
        shallow: true,
      }
    );
  }, [pageValue, pageSizeValue]);

  return (
    <Wrap>
      <Header title="Article List" />
      <Buttons />
      <ArticleList data={{ articleData, totalSize, pageCount }} />
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
