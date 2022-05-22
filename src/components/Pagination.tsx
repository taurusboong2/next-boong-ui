import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const ArticleList = ({ data }) => {
  const router = useRouter();

  const { articlesData, totalSize, pageCount } = data;

  console.log(`아티클 데이타 :`, articlesData);
  console.log(totalSize);
  console.log(pageCount);

  return (
    <Wrap>
      <Link href="/Detail">디테일로</Link>
      <CardWrap>
        <Card.Group centered>
          {articlesData.map((e, i) => {
            return (
              <Link key={e.id} href="">
                <Card header={e.attributes.title} meta={e.id} description={e.attributes.description} />
              </Link>
            );
          })}
        </Card.Group>
      </CardWrap>
    </Wrap>
  );
};

export default ArticleList;

const Wrap = styled.div``;

const CardWrap = styled.div``;
