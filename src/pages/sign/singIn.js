import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import classnames from "classnames";
import { Alert } from "antd";
import classes from "./sing.module.scss";
import { setAuth } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import RouteService from "../../services/routeService";
import FetchApiService from "../../services/fetchApiService";
import { useState } from "react";

export default function SingIn() {
  const [isError, setIsError] = useState(false);
  const [, setCookie] = useCookies(["Token"]);
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

  const onSubmit = async (data) => {
    const { emailAddres, password } = data;
    const user = {
      email: emailAddres,
      password,
    };
    FetchApiService.loginUser(user)
      .then((res) => {
        if (res && res.user) {
          setCookie("Token", res.user.token);
          FetchApiService.getCurrentUser(res.user.token).then((res) => {
            console.log(res);
            dispatch(setUser(res.user));
          });
          dispatch(setAuth(true));
        }
      })
      .catch((err) => {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });

    reset();
  };

  if (isAuth) return <Navigate to={RouteService.mainRoute} />;

  const loginForm = (
    <>
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
    </>
  );

  return (
    <div className={classes.singUpBlock}>
      {isError ? (
        <Alert
          message='Error'
          description='invalid password or email'
          type='error'
          showIcon
        />
      ) : null}
      {loginForm}
    </div>
  );
}
