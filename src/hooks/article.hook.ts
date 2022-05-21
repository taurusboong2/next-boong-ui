import { useEffect, useState } from 'react';
import { fetchArticleDetail, fetchArticleList, updateArticle, removeArticle, createArticle } from '../networks/article';
import { Article, ArticleListItem, ArticleCreateValue } from '../types/article';

export const useArticleDetail = (id?: number | string) => {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    if (!id) return;
    fetchArticleDetail(id).then(res => {
      const articleData = res.data.data;
      setArticle(articleData);
    });
  }, [id]);

  return { article };
};

export const useArticleList = (page?: number | string, pageSize?: number | string) => {
  const [articlesData, setArticlesData] = useState<ArticleListItem[]>();
  const [totalSize, setTotalSize] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!page || !pageSize) {
      return;
    }
    (async () => {
      fetchArticleList(page, pageSize).then(res => {
        const articleData = res.data;
        const articleMeta = res.meta;
        setArticlesData(articleData);
        setTotalSize(articleMeta.pagination.total);
        setPageCount(articleMeta.pagination.pageCount);
      });
    })();
  }, [page, pageSize]);

  return { articlesData, totalSize, pageCount };
};

export const useUpdateArticle = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const update = async (id: number | string, data: ArticleCreateValue) => {
    setIsSubmitting(true);
    await updateArticle(id, data);
    setIsSubmitting(false);
  };

  return { update, isSubmitting };
};

export const useDeleteArticle = () => {
  const [isdelete, setIsDelete] = useState<boolean>(false);

  const deleteArticle = async (id: number | string | undefined) => {
    if (!id) return;
    setIsDelete(true);
    await removeArticle(id);
    setIsDelete(false);
  };
  return { deleteArticle, isdelete };
};

export const useCreateArticle = () => {
  const [iscreating, setIsCreating] = useState<boolean>(false);

  const postArticle = async (data: ArticleCreateValue) => {
    if (!data) return;
    setIsCreating(true);
    await createArticle(data);
    setIsCreating(false);
  };

  return { postArticle, iscreating };
};
