import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { memo } from "react";
import classnames from "classnames";
import { setAuth } from "../../redux/slices/authSlice";
import RouteService from "../../services/routeService";
import classes from "./Header.module.scss";
import defaultAvatarImg from "../../assests/img/avatar.svg";

function Header() {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const user = useSelector((state) => state.userSlice.user);

  const dispatch = useDispatch();

  const avatar = user?.image ? user.image : defaultAvatarImg;

  const logOut = () => {
    dispatch(setAuth(false));
  };

  const userWithoutAccount = (
    <div className={classes.userAuthorizationBlock}>
      <Link to={RouteService.signInRoute} className={classes.btn}>
        Sign In
      </Link>
      <Link to={RouteService.signUpRoute} className={classes.btn}>
        Sign Up
      </Link>
    </div>
  );

  const userWithAccount = (
    <div className={classes.userBlock}>
      <Link
        to={RouteService.createArticleRout}
        className={classes.createArticle}
      >
        Create article
      </Link>
      <div className={classes.userInfoBlock}>
        <p className={classes.name}>{user?.username}</p>
        <Link to={RouteService.profileRouter}>
          <img src={avatar} alt='f' className={classes.avatar} />
        </Link>
      </div>
      <Link
        to={RouteService.articlesRoute}
        className={classnames([classes.btn, classes.btnLogout])}
        onClick={logOut}
      >
        Log out
      </Link>
    </div>
  );

  return (
    <div className={classes.header}>
      <Link className={classes.logo} to={RouteService.articlesRoute}>
        Realworld Blog
      </Link>
      {isAuth ? userWithAccount : userWithoutAccount}
    </div>
  );
}

export default memo(Header);
