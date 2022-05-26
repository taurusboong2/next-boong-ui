import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../../components/Header';
import Buttons from '../../components/Buttons';
import { useUpdateArticle } from '../../hooks/article.hook';
import { GetServerSideProps } from 'next';
import { fetchArticleDetail } from '../../networks/article';
import Head from 'next/head';
import { NextPage } from 'next';
import { ArticleDetailRes } from '../../types/article';

type Props = {
  detailData: ArticleDetailRes;
  id: number | string;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const res = await fetchArticleDetail(id);
  const data = res.data;

  return {
    props: {
      detailData: data,
      id: id,
    },
  };
};

const PatchArticle: NextPage<Props> = ({ detailData, id }) => {
  const router = useRouter();

  const data = detailData.data;

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const { update, isSubmitting } = useUpdateArticle();

  useEffect(() => {
    if (data) {
      if (titleInputRef.current && descriptionInputRef.current) {
        titleInputRef.current.value = data.attributes.title;
        descriptionInputRef.current.value = data.attributes.description;
      }
    }
  }, [data]);
  const handleSubmit = async () => {
    if (!titleInputRef.current?.value) {
      alert('타이틀란이 공란입니다.');
      return;
    }
    if (!descriptionInputRef.current?.value) {
      alert('설명란이 공란입니다.');
      return;
    }

    await update(id as string, {
      data: {
        title: titleInputRef.current?.value as string,
        description: descriptionInputRef.current?.value as string,
      },
    });

    router.push('/');
  };

  return (
    <>
      {data && (
        <>
          <Head>
            <title>ArticlePatch | TauBoong</title>
          </Head>
          <Wrap>
            <Header title="Patch Article" />
            <Buttons />
            <InputWrap>
              <h2>게시글 수정하기</h2>
              <div>
                <input ref={titleInputRef} type="text" name="title" id="title" />
              </div>
              <div>
                <input ref={descriptionInputRef} type="text" name="description" id="description" />
              </div>
              <input
                id="submit_btn"
                type="button"
                value={isSubmitting ? '전송중..' : '수정'}
                disabled={isSubmitting}
                onClick={handleSubmit}
              />
            </InputWrap>
          </Wrap>
        </>
      )}
    </>
  );
};

export default PatchArticle;

const Wrap = styled.div``;

const InputWrap = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h2 {
    font-size: 1.5rem;
    padding: 10px 35px;
    border: 3px solid #999;
    margin-bottom: 40px;
  }

  div {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 20px;
    margin-bottom: 30px;
    align-items: center;
    justify-content: center;
    border: 1px solid #999;

    input {
      width: 70%;
      text-align: center;
      height: 40px;
      font-size: 1.2rem;
    }
    input::placeholder {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  > input {
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    background-color: #649b92;
    color: #fff;

    &:hover {
      background-color: #5fc4b3;
    }
  }
`;
