import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "react-use-cookie";
import FetchApiService from "../../services/fetchApiService";

import ArticleFrom from "../../components/articleForm";

function CreateArticle() {
  const [isArticleCreated, setIsArticleCreated] = useState(false);

  const { reset } = useForm();

  const onSubmit = async (data) => {
    const token = getCookie("Token");
    const dataToSend = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: data.tags.map((tag) => tag.value),
    };

    FetchApiService.createArticle(dataToSend, token).then((res) => {
      if (res && res.article) {
        setIsArticleCreated(true);
      }
    });

    reset();
  };

  return (
    <ArticleFrom
      title={"Create article"}
      isArticleCreated={isArticleCreated}
      onSubmit={onSubmit}
    />
  );
}

export default CreateArticle;
