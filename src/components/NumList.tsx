import React, { FC, useState, useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { useRouter } from 'next/router';

interface currentPageType {
  startIndex: number;
  endIndex: number;
}

type Props = {
  page: number | string | string[] | undefined;
  setPage: any;
  pageSize: number | string | string[] | undefined;
  numPage: number;
  pageCount: number;
};

const Articles: FC<Props> = ({ page, setPage, pageSize, numPage, pageCount }) => {
  const NumberPage = Number(page);

  const router = useRouter();

  const pageList: number[] = useMemo(() => {
    const pageCountArray = _.range(1, pageCount + 1);
    return pageCountArray;
  }, [pageCount]);

  const [currentPage, setCurrentPage] = useState<currentPageType>({
    startIndex: 0,
    endIndex: 10,
  });

  const pageLimit = 10;

  const goPage = (number): void => {
    setPage(number);
    router.push(`?page=${number}&pageSize=${pageSize}`, `/pagination?page=${number}&pageSize=${pageSize}`, {
      shallow: false,
    });

    if (number + 1 > currentPage.endIndex) {
      setCurrentPage({
        endIndex: currentPage.endIndex + pageLimit,
        startIndex: currentPage.startIndex + pageLimit,
      });
    } else if ((number - 1) % pageLimit == 0) {
      setCurrentPage({
        endIndex: currentPage.endIndex - pageLimit,
        startIndex: currentPage.startIndex - pageLimit,
      });
    }
  };

  const nextBtnClick = () => {
    setPage(NumberPage + 1);

    if (NumberPage + 1 > currentPage.endIndex) {
      setCurrentPage({
        endIndex: currentPage.endIndex + pageLimit,
        startIndex: currentPage.startIndex + pageLimit,
      });
    }
  };

  const prevBtnClick = () => {
    setPage(NumberPage - 1);

    if ((NumberPage - 1) % pageLimit == 0) {
      setCurrentPage({
        endIndex: currentPage.endIndex - pageLimit,
        startIndex: currentPage.startIndex - pageLimit,
      });
    }
  };

  const firstBtnClick = () => {
    setPage(1);

    setCurrentPage({
      ...currentPage,
      endIndex: 10,
      startIndex: 0,
    });
  };

  const lastBtnClick = () => {
    setPage(numPage);

    setCurrentPage({
      ...currentPage,
      endIndex: pageList.length,
      startIndex: pageList.length - pageLimit,
    });
  };

  const pageNumberList = pageList.map(number => {
    if (number < currentPage.endIndex + 1 && number > currentPage.startIndex) {
      return (
        <PageLi key={number} className="page-item">
          <PageSpan
            onClick={() => setPage(number)}
            className={NumberPage === number ? 'page-link active' : 'page-link'}>
            <span className="numSpan">{number}</span>
          </PageSpan>
        </PageLi>
      );
    } else {
      return;
    }
  });

  return (
    <>
      <PageBtn>
        <Button onClick={firstBtnClick} disabled={NumberPage === 1}>
          ←←
        </Button>
        <Button onClick={prevBtnClick} disabled={NumberPage === 1}>
          ←
        </Button>
        <PageUl className="pagination">{pageNumberList}</PageUl>
        <Button onClick={nextBtnClick} disabled={NumberPage === numPage}>
          →
        </Button>
        <Button onClick={lastBtnClick} disabled={NumberPage === numPage}>
          →→
        </Button>
      </PageBtn>
    </>
  );
};

export default Articles;

const PageBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  margin: 10px;
`;

const Button = styled.button`
  padding: 5px;
  margin: 0;
  background: black;
  color: white;
  font-size: 15px;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }
`;

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: rgba(0, 0, 0, 0.4);
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }

  &:focus::after {
    color: white;
    background-color: #263a6c;
  }

  .active {
    padding: 0 3px;
    border-radius: 5px;
    color: white;
    background-color: #263a6c;
  }
  &:active,
  &:focus {
    padding: 0 3px;
    border-radius: 5px;
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  /* min-width: 10px;
  min-height: 10px; */

  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }

  a {
    width: 10px;
    height: 10px;
    /* border-radius: 50%; */

    &:active,
    &:focus {
      padding: 0 3px;
      border-radius: 5px;
      color: white;
      background-color: #263a6c;
    }
  }

  .numSpan {
    padding: 0 3px;
  }
`;
