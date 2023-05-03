import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <nav className={styles["navbar"]}>
        <h1 className={styles["title"]}>App name</h1>
      </nav>
      <div className={styles["container"]}>
        <div className={styles["signup-form"]}>
          <div className={styles["heading"]}>
            <h1>Register</h1>
            <p>Sign up to MHM today! Enter your details below.</p>
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
              </div>
            </div>
            <div className={styles["input"]}>
              <button className={`${styles["submit-btn"]}`} type="submit">
                Register
              </button>
            </div>
            <NavLink className={styles["redirect-signup"]} to="/authenticate/login">
              Already have an account? Sign in!
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
}
