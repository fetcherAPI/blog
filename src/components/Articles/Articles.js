import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination, Alert } from "antd";
import { setArticles } from "../../redux/slices/articlesSlice";
import FetchApiService from "../../services/fetchApiService";
import classes from "./Articles.module.scss";
import { Spiner } from "../Spiner/Spiner";
import Article from "./Article";

function Articles() {
  const articles = useSelector((state) => state.articlesSlice.articles);
  const dispatch = useDispatch();
  const [totalArticlesCount, setTotalCountArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getArticles();
    return () => {
      setError({});
    };
  }, []);

  const getArticles = async (page = 1) => {
    FetchApiService.getArticles(page)
      .then((res) => {
        dispatch(setArticles(res.articles));
        setTotalCountArticles(res.articlesCount);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChange = (e) => {
    getArticles(e);
  };

  const artticlesList = articles.map((article) => {
    return <Article key={article.slug} {...article} />;
  });

  return (
    <ul className={classes.list}>
      {error.message && (
        <Alert
          message={error.message}
          description='server could not answer.'
          type='error'
          showIcon
        />
      )}
      {isLoading ? <Spiner /> : artticlesList}
      {totalArticlesCount ? (
        <Pagination
          defaultCurrent={0}
          total={totalArticlesCount}
          pageSizeOptions={[1]}
          showSizeChanger={false}
          onChange={onChange}
        />
      ) : null}
    </ul>
  );
}

export default Articles;
