import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { setArticles } from "../../redux/slices/articlesSlice";
import FetchApiService from "../../services/fetchApiService";

import classes from "./Articles.module.scss";
import { Spiner } from "../Spiner/Spiner";
import Article from "./Article";

function Articles() {
  const articles = useSelector((state) => state.articlesSlice.articles);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    FetchApiService.getArticles()
      .then((res) => dispatch(setArticles(res.articles)))
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const artticlesList = articles.map((article) => {
    return <Article key={article.slug} {...article} />;
  });

  return (
    <ul className={classes.list}>{isLoading ? <Spiner /> : artticlesList}</ul>
  );
}

export default Articles;
