import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const ArticleList = () => {
  const router = useRouter();

  console.log(router);

  return (
    <Wrap>
      <Link href="/Detail">디테일로</Link>
      <CardWrap>
        <Card.Group centered>
          <Link href="">
            <Card
              header="Jenny Hess"
              meta="Friend"
              description="Jenny is a student studying Media Management at the New School"
            />
          </Link>
        </Card.Group>
      </CardWrap>
    </Wrap>
  );
};

export default ArticleList;

const Wrap = styled.div``;

const CardWrap = styled.div``;
