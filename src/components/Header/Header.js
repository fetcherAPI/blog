import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Header.module.scss";
import RouteService from "../../services/routeService";
import defaultAvatarImg from "../../assests/img/avatar.svg";

function Header() {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const user = useSelector((state) => state.userSlice.user);
  console.log("user", user);

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
      <Link to={RouteService.mainRoute} className={classes.createArticle}>
        Create article
      </Link>
      <div className={classes.userInfoBlock}>
        <p className={classes.name}>{user?.username}</p>
        <img src={defaultAvatarImg} alt='f' className={classes.avatar} />
      </div>
      <Link to={RouteService.signUpRoute} className={classes.btn}>
        Log out
      </Link>
    </div>
  );

  return (
    <div className={classes.header}>
      <Link className={classes.logo} to='/articles'>
        Realworld Blog
      </Link>
      {isAuth ? userWithAccount : userWithoutAccount}
    </div>
  );
}

export default Header;
