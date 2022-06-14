import { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { Link, Navigate } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import classnames from "classnames";
import fetchApiService from "../../services/fetchApiService";
import { getDate } from "../../services/getDateService";
import RouteService from "../../services/routeService";
import classes from "./Articles.module.scss";

function Article(props) {
  const { slug } = props;
  const token = getCookie("Token");
  const isAuth = useSelector((state) => state.authSlice.isAuth);

  const [content, setContent] = useState(props);
  const [isRedirect, setIsRedirect] = useState(false);
  const onClickLike = (slug) => {
    if (isAuth) {
      if (!content.favorited) {
        fetchApiService
          .addToFovorite(slug, token)
          .then((res) => setContent(res.article));
      } else {
        fetchApiService
          .removeFromFovorite(slug, token)
          .then((res) => setContent(res.article));
      }
    } else {
      setIsRedirect(true);
    }
  };

  if (isRedirect) return <Navigate to={RouteService.signInRoute} />;

  const { image, username } = content.author;
  return (
    <li className={classes.articleBlock}>
      <div className={classes.header}>
        <Link className={classes.title} to={`/articles/${slug}`}>
          {content.title}
        </Link>
        <button
          className={
            !content.favorited
              ? classes.like
              : classnames([classes.like, classes.liked])
          }
          onClick={() => onClickLike(slug)}
        >
          {content.favoritesCount}
        </button>
        <div className={classes.info}>
          <div className={classes.text}>
            <h4 className={classes.userName}>{username}</h4>
            <p className={classes.createDate}>{getDate(content.createdAt)}</p>
          </div>
          <img className={classes.avatar} src={image} alt='avatar' />
        </div>
      </div>
      <div className={classes.tagList}>
        {content.tagList.map((tag, i) => {
          return (
            <p className={classes.tag} key={i}>
              {tag}
            </p>
          );
        })}
      </div>
      <div className={classes.description}>
        <p>{content.description}</p>
      </div>
    </li>
  );
}

Article.propTypes = {};

export default Article;
