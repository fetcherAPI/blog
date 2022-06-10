import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { Alert } from "antd";
import RouteService from "../../services/routeService";
import FetchApiService from "../../services/fetchApiService";

import classes from "./sing.module.scss";
import successImg from "../../assests/img/checkbox.png";

export default function SingUp() {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isSingle, setIsSingle] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isSingedUp, setIsSingedUp] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    password === passwordRepeat ? setIsSingle(true) : setIsSingle(false);
  }, [passwordRepeat]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (data) => {
    const { userName, emailAddres, password } = data;

    const newUser = {
      username: userName,
      email: emailAddres,
      password,
    };
    reset();
    FetchApiService.createUser(newUser)
      .then((res) => {
        console.log("res", res);
        if (res && res.user) {
          setIsSingedUp(true);
          return;
        }
        if (res && res.isError) {
          setIsError(true);
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log("isError", err, isError);
      });
  };

  const successSigned = isSingedUp && (
    <div className={classes.succsses}>
      <h1>You are singed up successfully</h1>
      <img src={successImg} alt='succes logo' />
      <p>
        Please <Link to={RouteService.signInRoute}>Sign In</Link>
      </p>
    </div>
  );

  const registerForm = (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>Create new user</h1>
        <label className={classes.label}>
          Username
          <br />
          <input
            autoComplete='on'
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
            autoComplete='on'
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
        <label className={classes.label}>
          Repeat password
          <br />
          <input
            autoComplete='on'
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
        <label onChange={() => setIsAgree(!isAgree)}>
          <input
            autoComplete='on'
            type='checkbox'
            className={classes.checkbox}
            {...register("agreement", { required: "agreement is required" })}
          />{" "}
          I isAgree to the processing of my personal information
          <div className={classes.errorBlock}>
            {errors?.agreement && <p>{errors?.agreement?.message}</p>}
          </div>
        </label>
        <button type='submit' className={classes.submit} disabled={!isAgree}>
          Create
        </button>
      </form>
      <span className={classes.haveAccount}>
        Already have an account?{" "}
        <Link style={{ color: "#1890FF" }} to={RouteService.signInRoute}>
          Sign in
        </Link>
      </span>
    </>
  );

  return (
    <div className={classes.singUpBlock}>
      {isError ? (
        <Alert
          message='Error'
          description='This user name or email already taken.'
          type='error'
          showIcon
          closable
        />
      ) : null}
      {isSingedUp ? successSigned : registerForm}
    </div>
  );
}
