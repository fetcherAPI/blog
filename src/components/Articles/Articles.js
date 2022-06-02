import { Link } from "react-router-dom";
import classes from "./Articles.module.scss";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import FetchApiService from "../../services/fetchApiService";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchApiService = new FetchApiService();
    fetchApiService.getArticles().then((res) => setArticles(res.articles));
  }, []);

  const getDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return "Дата неизвестна";
    }
  };

  console.log("", articles);
  const artticlesList = articles.map((article, i) => {
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

  return <div className={classes.list}>{artticlesList}</div>;
}

export default Articles;
