import classes from "./Header.module.scss";
function Header() {
  return (
    <div className={classes.header}>
      <h1 className={classes.logo}>Realworld Blog</h1>
      <div className={classes.authorizationBlock}>
        <button className={classes.btn}>Sign In</button>
        <button className={classes.btn}>Sign Up</button>
      </div>
    </div>
  );
}

export default Header;
