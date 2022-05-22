import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useArticleList } from '../hooks/article.hook';
import NumList from '../components/NumList';

const ArticleList = ({ data }) => {
  const router = useRouter();
  console.log(router);

  const { page, pageSize } = router.query;

  const { articlesData, totalSize, pageCount } = data;

  const numPage = useMemo(() => {
    if (!totalSize || !pageSize) return 0;
    return Math.ceil(totalSize / Number(pageSize));
  }, [totalSize, pageSize]);

  console.log(`아티클 데이타 :`, articlesData);

  useEffect(() => {
    const { pathname } = router;
    console.log(pathname);
    if (page !== router.query.counter) {
      router.push(`?page=${page}&pageSize=${pageSize}`, `/pagination?page=${page}&pageSize=${pageSize}`, {
        shallow: true,
      });
    }
  }, [page, pageSize]);

  const onHandlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newSize = e.currentTarget.value;
    router.push(`?page=1&pageSize=${newSize}`, `/pagination?page=1&pageSize=${newSize}`, { shallow: true });
  };

  const onHandlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&pageSize=${pageSize}`, `/pagination?page=${newPage}&pageSize=${pageSize}`, {
      shallow: true,
    });
  };

  if (!articlesData) {
    return <div>로딩중..</div>;
  } else if (!pageSize) {
    return <>페이지 사이즈 오류</>;
  }

  return (
    <Wrap>
      <select typeof="number" value={pageSize} onChange={onHandlePageSizeChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <CardWrap>
        <Card.Group centered>
          {articlesData.map((e, i) => {
            return (
              <span key={i} onClick={() => router.push(`/Detail/${e.id}`)}>
                <Card
                  className="cards"
                  header={e.attributes.title}
                  meta={e.id}
                  description={e.attributes.description}
                />
              </span>
            );
          })}
        </Card.Group>
      </CardWrap>
      <NumList page={page} setPage={onHandlePageChange} pageSize={pageSize} numPage={numPage} pageCount={pageCount} />
    </Wrap>
  );
};

export default ArticleList;

const Wrap = styled.div`
  width: 100%auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;

  .cards {
    margin-top: 50px;
  }
`;

const CardWrap = styled.div``;
