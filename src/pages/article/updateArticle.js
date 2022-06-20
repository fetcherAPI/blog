import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getCookie } from "react-use-cookie";

import ArticleFrom from "../../components/articleForm";
import FetchApiService from "../../services/fetchApiService";
import RouteService from "../../services/routeService";
import { useEffect } from "react";

function UpdateArticle() {
  const [isArticleUpdated, setIsArticleUpdated] = useState(false);
  const [content, setContent] = useState(null);
  const { reset } = useForm();

  const token = getCookie("Token");
  const { slug } = useParams();

  useEffect(() => {
    FetchApiService.getArticle(slug)
      .then((res) => {
        setContent(res.article);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const onSubmit = async (data) => {
    const dataToSend = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: data.tags.map((tag) => tag.value),
    };

    FetchApiService.updateArticle(dataToSend, slug, token).then(() =>
      setIsArticleUpdated(true)
    );

    reset();
  };

  if (isArticleUpdated) return <Navigate to={RouteService.articlesRoute} />;

  return (
    <ArticleFrom
      title={"Update article"}
      isArticleUpdated={isArticleUpdated}
      onSubmit={onSubmit}
      content={content}
    />
  );
}

export default UpdateArticle;
