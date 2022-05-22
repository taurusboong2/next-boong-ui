import React from 'react';
import { Card } from 'semantic-ui-react';
import Header from '../../components/Header';
import styled from 'styled-components';

const Detail = () => {
  return (
    <Wrap>
      <Header title="Article Detail" />
      <ContentWrap>
        <Card.Group>
          <Card fluid className="card" color="red" header="Option 1" />
        </Card.Group>
      </ContentWrap>
    </Wrap>
  );
};

export default Detail;

const Wrap = styled.div``;

const ContentWrap = styled.div`
  margin-top: 50px;

  .card {
    text-align: center;
  }
`;
