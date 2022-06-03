import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchApiService from "../../services/fetchApiService";
import classes from "./Articles.module.scss";
import format from "date-fns/format";

function Article() {
  const { slug } = useParams();
  const [selectedArticle, setSelectedArticle] = useState();

  const getArticle = () => {
    FetchApiService.getArticle(slug).then((res) => {
      console.log("res", res);
      setSelectedArticle(res.article);
    });
  };

  useEffect(() => {
    getArticle();
  });

  const getDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return "Дата неизвестна";
    }
  };

  const { username, image } = selectedArticle.author;
  const { createdAt, title, favoritesCount, description, tagList } =
    selectedArticle;

  return (
    <div className={classes.singleArticle}>
      <div className={classes.articleBlock} key={slug}>
        <div className={classes.header}>
          <h1 className={classes.title}>{title}</h1>
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
    </div>
  );
}

export default Article;
