import React, { useRef } from 'react';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import styled from 'styled-components';
import { useCreateArticle } from '../hooks/article.hook';
import { useRouter } from 'next/router';

const Create = () => {
  const router = useRouter();
  const { postArticle, iscreating } = useCreateArticle();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!titleInputRef.current?.value) {
      alert('타이틀란이 공란입니다.');
      return;
    }
    if (!descriptionInputRef.current?.value) {
      alert('설명란이 공란입니다.');
      return;
    }

    await postArticle({
      data: {
        title: titleInputRef.current?.value as string,
        description: descriptionInputRef.current?.value as string,
      },
    });

    router.push('/');
  };

  return (
    <Wrap>
      <Header title="Create Article" />
      <Buttons />
      <InputWrap>
        <h2>게시글 생성하기</h2>
        <div>
          <input ref={titleInputRef} type="text" name="title" id="title" />
        </div>
        <div>
          <input ref={descriptionInputRef} type="text" name="description" id="description" />
        </div>
        <input
          id="submit_btn"
          type="button"
          value={iscreating ? '생성중..' : '생성'}
          disabled={iscreating}
          onClick={handleSubmit}
        />
      </InputWrap>
    </Wrap>
  );
};

export default Create;

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
