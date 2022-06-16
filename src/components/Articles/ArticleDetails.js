import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getCookie } from "react-use-cookie";
import FetchApiService from "../../services/fetchApiService";
import { setArticle } from "../../redux/slices/articlesSlice";
import { message, Popconfirm } from "antd";
import classes from "./Articles.module.scss";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { getDate } from "../../services/getDateService.js";

function ArticleDetails() {
  const { slug } = useParams();
  console.log(useParams);

  const dispatch = useDispatch();
  const article = useSelector((state) => state.articlesSlice.article);

  const confirm = () => {
    FetchApiService.deleteArticle(slug, getCookie("Token")).catch((error) =>
      console.log("error", error)
    );
  };

  useEffect(() => {
    FetchApiService.getArticle(slug).then((res) => dispatch(setArticle(res)));
  }, []);

  return article?.article ? (
    <div className={classes.singleArticle}>
      <div className={classes.header}>
        <Link className={classes.title} to={`/articles/${slug}`}>
          {article?.article.title}
        </Link>
        <button
          className={
            !article?.article.favorited
              ? classes.like
              : classnames([classes.like, classes.liked])
          }
          // onClick={() => onClickLike(slug)}
        >
          {article?.article.favoritesCount}
        </button>
        <div className={classes.info}>
          <div className={classes.userBlock}>
            <div className={classes.text}>
              <h4 className={classes.userName}>
                {article?.article.author.username}
              </h4>
              <p className={classes.createDate}>
                {getDate(article?.article.createdAt)}
              </p>
            </div>
            <img
              className={classes.avatar}
              src={article?.article.author.image}
              alt='avatar'
            />
          </div>
          <div className={classes.controlBtnsBlcok}>
            <Popconfirm
              placement='leftTop'
              title='Are you sure to delete this article?'
              onConfirm={confirm}
              okText='Yes'
              cancelText='No'
            >
              <button className={classes.deleteBtn}> Delete </button>
            </Popconfirm>

            <Link to={`articles/${slug}/edit`}>
              <button className={classes.editBtn}> Edit </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={classes.tagList}>
        {article?.article.tagList.map((tag, i) => {
          return (
            <p className={classes.tag} key={i}>
              {tag}
            </p>
          );
        })}
      </div>
      <div className={classes.description}>
        <p>{article?.article.description}</p>
      </div>
      <ReactMarkdown>{article?.article.body}</ReactMarkdown>
    </div>
  ) : (
    <h1>wait</h1>
  );
}

export default memo(ArticleDetails);
