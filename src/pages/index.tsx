import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import ArticleList from '../components/Pagination';
import Buttons from '../components/Buttons';
import NumList from '../components/NumList';

const Home: NextPage = () => {
  const router = useRouter();
  console.log(router);

  // const [pageState, setPageState] = useState<number>(1);
  // const [pageSizeState, setPageSizeState] = useState<number>(10);

  const { page, pageSize } = router.query || undefined;

  useEffect(() => {
    if (pageSize && page) {
      return;
    }
    router.push(`?page=1&pageSize=10`, `/pagination?page=1&pageSize=10`, { shallow: true });
  }, []);

  useEffect(() => {
    console.log(`페이지변경`, page);
    console.log(`페이지사이즈변경`, pageSize);
  }, [page, pageSize]);

  return (
    <Wrap>
      <Header title="Article List" />
      <Buttons />
      <ArticleList page={page} pageSize={pageSize} />
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
