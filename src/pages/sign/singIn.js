import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import classnames from "classnames";
import classes from "./sing.module.scss";
import { setAuth } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import RouteService from "../../services/routeService";
import FetchApiService from "../../services/fetchApiService";
import { useCookies } from "react-cookie";

export default function SingIn() {
  const [password, setPassword] = useState("");
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
          FetchApiService.getCurrentUser().then((res) =>
            dispatch(setUser(res.user))
          );
          dispatch(setAuth(true));
        }
        console.log(res);
      })
      .catch((err) => console.log("err", err));

    reset();
  };

  if (isAuth) return <Navigate to={RouteService.mainRoute} />;

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
