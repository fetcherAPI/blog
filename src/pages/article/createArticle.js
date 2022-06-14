import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "react-use-cookie";
import FetchApiService from "../../services/fetchApiService";

import ArticleFrom from "../../components/articleForm";

function CreateArticle() {
  const [isArticleCreated, setIsArticleCreated] = useState(false);

  const { reset } = useForm();

  const tegs = [
    {
      id: 1,
      name: "mobxTag",
      value: "",
    },
    {
      id: 2,
      name: "reactTag",
      value: "",
    },
    {
      id: 3,
      name: "reduxTag",
      value: "",
    },
    {
      id: 4,
      name: "hooo",
      value: "",
    },
  ];

  const onSubmit = async (data) => {
    console.log(data);
    const token = getCookie("Token");
    const dataToSend = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: ["programming", "react", "redux"],
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
      tegs={tegs}
    />
  );
}

export default CreateArticle;
