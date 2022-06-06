import RouteService from "../../services/routeService";
import { useForm } from "react-hook-form";
import classes from "./sing.module.scss";
import classnames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";

export default function SingIn() {
  const [password, setPassword] = useState("");

  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    dispatch(setAuth(true));
    reset();
  };

  return (
    <div className={classes.singUpBlock}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>Sign In</h1>

        <label className={classes.label}>
          Email address
          <br />
          <input
            autoComplete='on'
            type='email'
            placeholder='Email address'
            className={classnames(
              classes.input,
              errors.emailAddres ? classes.inputError : ""
            )}
            {...register("emailAddres", {
              required: "email is required",
              minLength: {
                value: 3,
                message: "min 3 char",
              },
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
            autoComplete='on'
            type='password'
            placeholder='password'
            className={classnames(
              classes.input,
              errors.password ? classes.inputError : ""
            )}
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters.",
              },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.errorBlock}>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
        </label>
        <input autoComplete='on' type='submit' className={classes.submit} />
      </form>
      <span className={classes.haveAccount}>
        Don’t have an account?{" "}
        <Link style={{ color: "#1890FF" }} to={RouteService.signUpRoute}>
          Sign Up
        </Link>
      </span>
    </div>
  );
}
