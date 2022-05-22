import { api } from '../common/api';
import { ArticleListRes, ArticleDetailRes, ArticleCreateValue } from '../types/article';
import { sleep } from '../common/utils';

export const fetchArticleList = async (page: number | string | string[], pageSize: number | string | string[]) => {
  const response = await api.get<ArticleListRes>(
    `/api/articles/?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
  return response.data;
};

export const fetchArticleDetail = async (id: string | number | string[]) => {
  const response = await api.get<ArticleDetailRes>(`/api/articles/${id}`);
  return response;
};

export const createArticle = async (data: ArticleCreateValue) => {
  await sleep(3000);
  const response = await api.post<ArticleCreateValue>(`/api/articles`, data);
  console.log(response);
};

export const removeArticle = async (id: string | number | string[]) => {
  if (confirm('현재 Article을 삭제하시겠습니까?')) {
    await sleep(3000);
    const response = await api.delete<ArticleDetailRes>(`/api/articles/${id}`);
    console.log(response);
  }
};

export const updateArticle = async (id: number | string, data: ArticleCreateValue) => {
  await sleep(3000);
  const response = await api.put(`/api/articles/${id}`, {
    ...data,
  });
  console.log(response);
};
