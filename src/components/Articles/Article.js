import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchApiService from "../../services/fetchApiService";
import classes from "./Articles.module.scss";
import { Link } from "react-router-dom";
import format from "date-fns/format";

function Article() {
  const { slug } = useParams();
  const [selectedArticle, setSelectedArticle] = useState();

  useEffect(() => {
    console.log("fdjskjglk");
    const fetchApiService = new FetchApiService();
    fetchApiService
      .getArticle(slug)
      .then((res) => setSelectedArticle(res.article));
  });

  const getDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return "Дата неизвестна";
    }
  };

  console.log("article", selectedArticle);
  const { username, image } = selectedArticle.author;
  const {
    createdAt,
    title,
    favoritesCount,
    description,
    tagList,
    slug: slugID,
  } = selectedArticle;

  return (
    <div className={classes.articleBlock} key={slugID}>
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
}

export default Article;
