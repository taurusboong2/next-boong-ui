import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import NumList from '../components/NumList';
import Link from 'next/link';

const ArticleList = ({ data }) => {
  const router = useRouter();

  const { page, pageSize } = router.query;

  const { articleData, totalSize, pageCount } = data;

  const numPage = useMemo(() => {
    if (!totalSize || !pageSize) return 0;
    return Math.ceil(totalSize / Number(pageSize));
  }, [totalSize, pageSize]);

  const onHandlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newSize = e.currentTarget.value;
    router.push(`?page=1&pageSize=${newSize}`, `/pagination?page=1&pageSize=${newSize}`, { shallow: false });
  };

  const onHandlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&pageSize=${pageSize}`, `/pagination?page=${newPage}&pageSize=${pageSize}`, {
      shallow: false,
    });
  };

  if (!articleData) {
    return <div>로딩중..</div>;
  } else if (!pageSize) {
    return <>페이지 사이즈 오류</>;
  }

  return (
    <Wrap>
      <Link href="/Create">
        <CreateBtn>CREATE</CreateBtn>
      </Link>

      <select typeof="number" value={pageSize} onChange={onHandlePageSizeChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <CardWrap>
        <Card.Group centered>
          {articleData.map((e, i) => {
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

const Button = styled.button`
  min-width: 150px;
  min-height: 20px;
  margin: 10px 0;
  cursor: pointer;
`;

const CreateBtn = styled(Button)``;
