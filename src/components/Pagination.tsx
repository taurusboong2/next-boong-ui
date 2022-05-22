import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useArticleList } from '../hooks/article.hook';
import NumList from '../components/NumList';

type ArticleListProps = {
  page: string | string[] | undefined;
  pageSize: string | undefined;
};

const ArticleList = ({ page, pageSize }: ArticleListProps) => {
  const router = useRouter();

  const { articlesData, totalSize, pageCount } = useArticleList(page, pageSize);

  const numPage = useMemo(() => {
    if (!totalSize || !pageSize) return 0;
    return Math.ceil(totalSize / parseInt(pageSize));
  }, [totalSize, pageSize]);

  console.log(`아티클 데이타 :`, articlesData);
  console.log(totalSize);
  console.log(pageCount);
  console.log(page);
  console.log(pageSize);

  const onHandlePageChange = (newPage: number) => {
    router.push(
      `?page=${newPage + ''}&pageSize=${pageSize as string}`,
      `/pagination?page=${newPage + ''}&pageSize=${pageSize as string}`,
      { shallow: true }
    );
  };

  if (!articlesData) {
    return <div>로딩중..</div>;
  } else if (!pageSize) {
    return <>페이지 사이즈 오류</>;
  }

  return (
    <Wrap>
      <Link href="/Detail">디테일로</Link>
      <CardWrap>
        <Card.Group centered>
          {articlesData.map((e, i) => {
            return (
              <span key={i} onClick={() => router.push(`/Detail/${e.id}`)}>
                <Card header={e.attributes.title} meta={e.id} description={e.attributes.description} />
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

const Wrap = styled.div``;

const CardWrap = styled.div``;
