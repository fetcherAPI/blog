import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getCookie, setCookie } from "react-use-cookie";
import classnames from "classnames";
import { setUser } from "../../redux/slices/userSlice";
import FetchApiService from "../../services/fetchApiService";
import classes from "../sign/sing.module.scss";
import { useCookies } from "react-cookie";

function Profile() {
  const [, setCookie] = useCookies(["Token"]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data.userName);
    const updatedUser = {
      email: data.emailAddres,
      token: getCookie("Token"),
      username: data.userName,
      bio: "",
      image: data.avatarUrl,
    };
    FetchApiService.updateUserData(updatedUser).then(
      (res) => (dispatch(setUser(res.user)), setCookie("Token", res.user.token))
    );
    reset();
  };

  return (
    <div className={classes.singUpBlock}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>Edit Profile</h1>
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
              minLength: {
                value: 3,
                message: "min 3 char",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "please enter the valid email",
              },
            })}
          />
          <div className={classes.errorBlock}>
            {errors?.emailAddres && <p>{errors?.emailAddres?.message}</p>}
          </div>
        </label>
        <label className={classes.label}>
          New Password
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
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.errorBlock}>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
        </label>
        <label className={classes.label}>
          Avatar image(url)
          <br />
          <input
            autoComplete='on'
            placeholder='Avatar image'
            className={classnames(
              classes.input,
              errors.userName ? classes.inputError : ""
            )}
            {...register("avatarUrl", {
              required: "url is required",
              pattern: {
                value:
                  /^(http:\/\/www.|https:\/\/www.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
                message: "please enter valid url",
              },
            })}
          />
          <div className={classes.errorBlock}>
            {errors?.avatarUrl && <p>{errors?.avatarUrl?.message}</p>}
          </div>
        </label>
        <input autoComplete='on' type='submit' className={classes.submit} />
      </form>
    </div>
  );
}

export default Profile;
