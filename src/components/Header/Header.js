import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

function Header() {
  return (
    <div className={classes.header}>
      <Link className={classes.logo} to='/articles'>
        Realworld Blog
      </Link>

      <div className={classes.authorizationBlock}>
        <button className={classes.btn}>Sign In</button>
        <button className={classes.btn}>Sign Up</button>
      </div>
    </div>
  );
}

export default Header;
