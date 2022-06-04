import RouteService from "../../services/routeService";
import { useForm } from "react-hook-form";
import classes from "./sing.module.scss";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SingUp() {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isSingle, setIsSingle] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    password === passwordRepeat ? setIsSingle(true) : setIsSingle(false);
  }, [passwordRepeat, password]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <div className={classes.singUpBlock}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>Create new user</h1>
        <label className={classes.label}>
          Username
          <br />
          <input
            placeholder='Username'
            className={classnames(
              classes.input,
              errors.userName ? classes.inputError : ""
            )}
            {...register("userName", {
              required: "username is required",
              minLength: {
                value: 3,
                message: "min 3 char",
              },
            })}
          />
          <div className={classes.errorBlock}>
            {errors?.userName && <p>{errors?.userName?.message}</p>}
          </div>
        </label>
        <label className={classes.label}>
          Email address
          <br />
          <input
            type='email'
            placeholder='Email address'
            className={classnames(
              classes.input,
              errors.emailAddres ? classes.inputError : ""
            )}
            {...register("emailAddres", {
              required: "email is required",
            })}
          />
          <div className={classes.errorBlock}>
            {errors?.emailAddres && <p>{errors?.emailAddres?.message}</p>}
          </div>
        </label>
        <label className={classes.label}>
          Password
          <br />
          <input
            type='password'
            placeholder='password'
            className={classnames(
              classes.input,
              errors.password ? classes.inputError : ""
            )}
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "min 8 char",
              },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.errorBlock}>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
        </label>
        <label className={classes.label}>
          Repeat password
          <br />
          <input
            type='password'
            placeholder='Password'
            className={classnames(
              classes.input,
              errors.password ? classes.inputError : ""
            )}
            {...register("passwordRepeat", {
              required: "password is required",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters.",
              },
            })}
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <div className={classes.errorBlock}>
            {isSingle ? (
              errors?.passwordRepeat && <p>{errors?.passwordRepeat?.message}</p>
            ) : (
              <p>Passwords must match</p>
            )}
          </div>
        </label>
        <label onChange={() => setAgree(!agree)}>
          <input
            type='checkbox'
            className={classes.checkbox}
            {...register("agreement", { required: "agreement is required" })}
          />{" "}
          I agree to the processing of my personal information
          <div className={classes.errorBlock}>
            {errors?.agreement && <p>{errors?.agreement?.message}</p>}
          </div>
        </label>
        <button type='submit' className={classes.submit} disabled={!agree}>
          Create
        </button>
      </form>
      <span className={classes.haveAccount}>
        Already have an account?{" "}
        <Link style={{ color: "#1890FF" }} to={RouteService.signInRoute}>
          Sign in
        </Link>
      </span>
    </div>
  );
}
