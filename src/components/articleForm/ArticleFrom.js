import classnames from "classnames";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import RouteService from "../../services/routeService";
import classes from "./ArticleForm.module.scss";

function ArticleFrom({ title, isArticleCreated, onSubmit, tegs }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const tagsInput = tegs.map((tag) => {
    console.log("tag", tag.name);
    const inputName = tag.name;

    return (
      <label key={tag.id} className={classes.labelTags}>
        <input
          autoComplete='on'
          placeholder='tag'
          className={classnames(
            classes.input,
            errors.emailAddres ? classes.inputError : ""
          )}
          {...register(`${inputName}`, {
            required: "tag is required",
          })}
        />
        <div className={classes.errorBlock}>
          {errors?.inputName && <p>{errors?.inputName?.message}</p>}
        </div>
        <button className={classnames([classes.btn, classes.btnDelete])}>
          Delete
        </button>
      </label>
    );
  });

  if (isArticleCreated) return <Navigate to={RouteService.mainRoute} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.ArticleFrom}>
      <h1 className={classes.title}>{title}</h1>

      <label className={classes.label}>
        Title
        <br />
        <input
          autoComplete='on'
          placeholder='Title'
          className={classnames(
            classes.input,
            errors.emailAddres ? classes.inputError : ""
          )}
          {...register("title", {
            required: "title is required",
            minLength: {
              value: 3,
              message: "min 3 char",
            },
          })}
        />
        <div className={classes.errorBlock}>
          {errors?.title && <p>{errors?.title?.message}</p>}
        </div>
      </label>

      <label className={classes.label}>
        Short description
        <br />
        <input
          autoComplete='on'
          placeholder='Short description'
          className={classnames(
            classes.input,
            errors.emailAddres ? classes.inputError : ""
          )}
          {...register("description", {
            required: "description is required",
            minLength: {
              value: 3,
              message: "min 3 char",
            },
          })}
        />
        <div className={classes.errorBlock}>
          {errors?.description && <p>{errors?.description?.message}</p>}
        </div>
      </label>
      <label className={classes.label}>
        Text
        <br />
        <textarea
          autoComplete='on'
          placeholder='text'
          className={classnames(
            classes.input,
            classes.inputText,
            errors.emailAddres ? classes.inputError : ""
          )}
          {...register("text", {
            required: "text is required",
            minLength: {
              value: 3,
              message: "min 3 char",
            },
          })}
        />
        <div className={classes.errorBlock}>
          {errors?.text && <p>{errors?.text?.message}</p>}
        </div>
      </label>
      <div className={classes.tagBlock}>
        <ul className={classes.tagList}>Tags{tagsInput}</ul>
        <button className={classnames([classes.btn, classes.btnAdd])}>
          Add Tag
        </button>
      </div>
      <button autoComplete='on' type='submit' className={classes.submit}>
        {" "}
        Sand
      </button>
    </form>
  );
}

ArticleFrom.propTypes = {
  title: PropTypes.string,
  isArticleCreated: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

ArticleFrom.defaultProps = {
  title: "",
  isArticleCreated: false,
};

export default ArticleFrom;
