import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import RouteService from "../../services/routeService";

function Header() {
  return (
    <div className={classes.header}>
      <Link className={classes.logo} to='/articles'>
        Realworld Blog
      </Link>
      <div className={classes.authorizationBlock}>
        <Link to={RouteService.signInRoute} className={classes.btn}>
          Sign In
        </Link>
        <Link to={RouteService.signUpRoute} className={classes.btn}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Header;
