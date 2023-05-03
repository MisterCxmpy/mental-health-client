import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <nav className={styles["navbar"]}>
        <h1 className={styles["title"]}>App name</h1>
      </nav>
      <div className={styles["container"]}>
        <div className={styles["login-form"]}>
          <div className={styles["heading"]}>
            <h1>Login</h1>
            <p>Welcome back to the MHM app</p>
          </div>
          <form>
            <div className={styles["input"]}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <span>Username</span>
            </div>
            <div className={styles["input"]}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span>Password</span>
              <div className={styles["under-text"]}>
                <div className={styles["remember-me"]}>
                  <p>Remember me</p>
                  <input type="checkbox" name="" id="" />
                </div>
                <p>Forgot Password</p>
              </div>
            </div>
            <div className={styles["input"]}>
              <button className={`${styles["submit-btn"]}`} type="submit">
                Sign In
              </button>
            </div>
            <Link className={styles["redirect-signup"]} to="/authenticate/signup">
              Don't have an account yet? Sign Up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
