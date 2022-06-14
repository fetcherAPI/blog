import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FetchApiService from "../../services/fetchApiService";
import { setArticle } from "../../redux/slices/articlesSlice";
import classes from "./Articles.module.scss";

function ArticleDetails() {
  const { slug } = useParams();
  const article = useSelector((state) => state.articlesSlice.article);
  const dispatch = useDispatch();

  useEffect(() => {
    FetchApiService.getArticle(slug).then((res) => dispatch(setArticle(res)));
  }, []);

  return (
    <div className={classes.singleArticle}>
      <h1>{article?.article?.slug}</h1>
      <div className={classes.markDown}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
        sapiente quaerat iure consequatur neque pariatur omnis enim quidem.
        Exercitationem aut dicta soluta accusamus pariatur expedita
        reprehenderit ea placeat ipsum tenetur!
      </div>
    </div>
  );
}

export default memo(ArticleDetails);
