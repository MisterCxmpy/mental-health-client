import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useState } from "react";
import { useAuth } from "../../contexts/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitForm = async e => {
    e.preventDefault()
    let payload = { username, password }

    try {
      await login(payload)
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <nav className={styles["navbar"]}>
        <h1 className={styles["title"]}>Serenity<span style={{color: "#9A9FDD"}}>AI</span></h1>
      </nav>
      <div className={styles["container"]}>
        <div className={styles["login-form"]}>
          <div className={styles["heading"]}>
            <h1>Login</h1>
            <p>Welcome back to the SerenityAI app</p>
          </div>
          <form onSubmit={submitForm}>
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

              {error ? <h3 style={{ color: 'red', margin: '12px 0' }}>{error}</h3> : null}
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
