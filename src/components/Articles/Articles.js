import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { setArticles } from "../../redux/slices/articlesSlice";
import FetchApiService from "../../services/fetchApiService";
import { getDate } from "../../services/getDateService";
import classes from "./Articles.module.scss";
import { Spiner } from "../Spiner/Spiner";

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
    const { username, image } = article.author;
    const { createdAt, title, favoritesCount, description, tagList, slug } =
      article;
    return (
      <div className={classes.articleBlock} key={slug}>
        <div className={classes.header}>
          <Link className={classes.title} to={`/articles/${slug}`}>
            {title}
          </Link>
          <button className={classes.like}>{favoritesCount}</button>
          <div className={classes.info}>
            <div className={classes.text}>
              <h4 className={classes.userName}>{username}</h4>
              <p className={classes.createDate}>{getDate(createdAt)}</p>
            </div>
            <img className={classes.avatar} src={image} alt='avatar' />
          </div>
        </div>
        <div className={classes.tagList}>
          {tagList.map((tag, i) => {
            return (
              <p className={classes.tag} key={i}>
                {tag}
              </p>
            );
          })}
        </div>
        <div className={classes.description}>
          <p>{description}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.list}>{isLoading ? <Spiner /> : artticlesList}</div>
  );
}

export default Articles;
