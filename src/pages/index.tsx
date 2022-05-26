import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { fetchArticleList } from '../networks/article';
import { IndexProps } from '../types/article';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';

export const getServerSideProps: GetServerSideProps = async context => {
  const { page = 1, pageSize = 10 } = context.query;
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

const Home: NextPage<IndexProps> = ({ data }) => {
  const router = useRouter();
  const [pageValue, setPageValue] = useState<any>(1);
  const [pageSizeValue, setPageSizeValue] = useState<any>(10);

  const { articleData, totalSize, pageCount } = data;

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
  }, [pageValue, pageSizeValue, page, pageSize]);

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
