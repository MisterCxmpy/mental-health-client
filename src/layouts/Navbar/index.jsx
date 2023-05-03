import { NavLink, Outlet } from "react-router-dom";
import styles from "./index.module.css";

export default function Navbar() {
  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["profile"]}>
          <div className={styles["profile-options"]}>
            <div className={styles["profile-btn"]}>My profile</div>
            <div className={styles["profile-btn"]}>S</div>
          </div>
          <div className={styles["profile-info"]}>
            <div className={styles["profile-picture"]}></div>
            <div className={styles["profile-name"]}>Bob</div>
            <div className={styles["progress"]}>40% Completed</div>
            <div className={styles["inspiration-message"]}>
              Keep smiling, because life is a beautiful thing and there's so
              much to smile about.
            </div>
          </div>
        </div>
        <div className={styles["navigation"]}>
          <NavButton to={"/"} name={"Home"} />
          <NavButton to={"/activities"} name={"Activities"} />
          <NavButton to={"/chatrooms"} name={"Chatrooms"} />
          <NavButton to={"/guides"} name={"Guides"} />
          <NavButton to={"/my-ai-mentor"} name={"My AIMentor"} />
          <NavButton to={"/meditations"} name={"Meditations"} />
          <NavButton to={"/mind-store"} name={"MindStore"} />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

function NavButton({ to, name }) {
  return (
    <NavLink
      to={to}
      className={styles["btn"]}
      style={({ isActive }) =>
        isActive
          ? {
              background: "#9A9FDD",
            }
          : { background: "none" }
      }
    >
      {name}
    </NavLink>
  );
}
