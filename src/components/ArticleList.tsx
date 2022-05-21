import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';

const ArticleList = () => {
  return (
    <Wrap>
      <Link href="/Detail">디테일로</Link>
      <CardWrap>
        <Card.Group centered>
          <Card
            header="Jenny Hess"
            meta="Friend"
            description="Jenny is a student studying Media Management at the New School"
          />
        </Card.Group>
      </CardWrap>
    </Wrap>
  );
};

export default ArticleList;

const Wrap = styled.div``;

const CardWrap = styled.div``;
