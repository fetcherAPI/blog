import classnames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { debounce } from "lodash";
import RouteService from "../../services/routeService";
import classes from "./ArticleForm.module.scss";

function ArticleFrom({ title, isArticleCreated, onSubmit, content }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [titleUpdate, setTitleUpdate] = useState(content?.title);
  const [descriptionUpdate, setDescriptionUpdate] = useState(
    content?.description
  );
  const [bodyUpdate, setBodyUpdate] = useState(content?.body);

  const onChangeTitle = debounce((value) => {
    setTitleUpdate(value);
  }, 200);

  const onChangeDescription = debounce((value) => {
    setDescriptionUpdate(value);
  }, 200);

  const onChangeBody = debounce((value) => {
    setBodyUpdate(value);
  }, 200);

  const { fields, append, remove } = useFieldArray({ name: "tags", control });

  const onClickDeleteBtn = (index) => {
    remove(index);
  };

  const onClickAddBtn = () => {
    append({ value: "" });
  };

  const tagsInput = fields.map((tag, i) => {
    return (
      <label key={tag.id} className={classes.labelTags}>
        <input
          autoComplete='on'
          placeholder='tag'
          className={classnames(
            classes.input,
            errors.emailAddres ? classes.inputError : ""
          )}
          name={`tags[${i}]`}
          {...register(`tags.${i}.value`, {
            required: "tag is required",
          })}
        />
        <div className={classes.errorBlock}>
          {errors?.tags && <p>{errors?.tags?.message}</p>}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onClickDeleteBtn(e.target.value);
          }}
          className={classnames([classes.btn, classes.btnDelete])}
          value={i}
        >
          Delete
        </button>
      </label>
    );
  });

  if (isArticleCreated) return <Navigate to={RouteService.mainRoute} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.ArticleFrom}>
      <h1 className={classes.title}>{title}</h1>

      <label
        className={classes.label}
        onChange={(e) => onChangeTitle(e.target.value)}
      >
        Title
        <br />
        <input
          autoComplete='on'
          placeholder='Title'
          value={titleUpdate}
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

      <label
        className={classes.label}
        onChange={(e) => onChangeDescription(e.target.value)}
      >
        Short description
        <br />
        <input
          autoComplete='on'
          placeholder='Short description'
          value={descriptionUpdate}
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
      <label
        className={classes.label}
        onChange={(e) => onChangeBody(e.target.value)}
      >
        Text
        <br />
        <textarea
          autoComplete='on'
          placeholder='text'
          value={bodyUpdate}
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
        <button
          onClick={(e) => {
            e.preventDefault();
            onClickAddBtn();
          }}
          className={classnames([classes.btn, classes.btnAdd])}
        >
          Add Tag
        </button>
      </div>
      <button autoComplete='on' type='submit' className={classes.submit}>
        {" "}
        Send
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
