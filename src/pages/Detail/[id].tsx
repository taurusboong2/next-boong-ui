import React from 'react';
import { Card } from 'semantic-ui-react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { useArticleDetail, useDeleteArticle } from '../../hooks/article.hook';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Detail = () => {
  const router = useRouter();

  const { id } = router.query;
  const { article } = useArticleDetail(id);
  const { deleteArticle, isdelete } = useDeleteArticle();

  const handleRemove = async () => {
    await deleteArticle(id);
    router.push(`/?page=1&pageSize=10`, `/pagination?page=1&pageSize=10`, { shallow: true });
  };

  if (!article) {
    return <div>로딩중...</div>;
  }
  if (isdelete) {
    return <div>삭제중...</div>;
  }

  return (
    <Wrap>
      <Header title="Article Detail" />
      <ContentWrap>
        <Card.Group>
          <Card
            fluid
            className="card"
            color="red"
            header={article?.attributes.title}
            meta={article?.id}
            description={article?.attributes.description}
          />
        </Card.Group>
      </ContentWrap>
      <BtnWrap>
        <button className="deleteBtn" onClick={handleRemove}>
          삭제
        </button>
        <button className="patchBtn">
          <Link href={`/PatchArticle?${id}`}>수정</Link>
        </button>
      </BtnWrap>
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

const BtnWrap = styled.div`
  padding: 10px;
  width: 150px;
  display: flex;
  border: 1px solid #999;
  margin: 35px auto 0;
  justify-content: center;
  column-gap: 20px;

  button {
    background-color: #cc0033;
    outline: none;
    border: 1px solid #999;
    padding: 5px 10px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #f46414;
    }
  }
  button.patchBtn {
    background-color: #74c580;

    &:hover {
      background-color: #39a78e;
    }
  }
`;
