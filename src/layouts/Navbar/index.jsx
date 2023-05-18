/* eslint-disable react/prop-types */
import { NavLink, Outlet } from "react-router-dom";
import useQuote from "../../hooks/useQuote.js";
import { useAuth } from "../../contexts/authContext";
import styles from "./index.module.css";
import { Line, Circle } from "rc-progress";

import { BiHome, BiGlassesAlt, BiLogOut } from "react-icons/bi/";
import { HiOutlinePuzzle, HiOutlineChat } from "react-icons/hi";
import { AiOutlineDollarCircle } from "react-icons/ai";

import { BsFillShieldFill } from "react-icons/bs";

import Avatar from "boring-avatars";

export default function Navbar() {
  const { user } = useAuth();
  const { quote } = useQuote();

  const userCompletedGoals =
    (user.st_goals.filter((g) => g.completed == true).length / 5) * 100;

  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["profile"]}>
          <div className={styles["profile-info"]}>
            <div className={styles["profile-progress"]}>
              <Circle
                percent={userCompletedGoals}
                strokeWidth={12}
                strokeColor="url(#gradient)"
                trailColor="transparent"
              />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient" y1="0" y2="1">
                    <stop stopColor="#9A9FDD" offset="0" />
                    <stop stopColor="#bA9FDD" offset="1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className={styles["profile-picture"]}>
                <Avatar
                  size={72}
                  variant="marble"
                  colors={["#9A9FDD", "#DEEFFE", "#E2FFFF"]}
                />
              </div>
            </div>
            <div className={styles["profile-name"]}>
              {user.username}{" "}
              <span className="admin-icon">
                {user.is_admin ? <BsFillShieldFill /> : null}
              </span>
            </div>
            <div className={styles["progress"]}>
              {userCompletedGoals}% Completed
            </div>
            <div className={styles["points"]}>
              {user.dabloons.toLocaleString("en-US")} Dabloons
            </div>
            <div className={styles["inspiration-message"]}>{quote.q}</div>
          </div>
        </div>
        <NavigationList />
      </nav>
      <Outlet />
    </>
  );
}

function NavigationList() {
  const { logout } = useAuth();

  return (
    <div className={styles["navigation"]} role="navigation-btns">
      <NavButton
        to={"/my-ai-mentor"}
        icon={<BiGlassesAlt />}
        name={"My AIMentor"}
        id={"my-ai-mentor"}
      />
      <div className={styles["content"]}>
        <NavButton to={"/"} icon={<BiHome />} name={"Home"} id={"home"} />
        <NavButton
          to={"/activities"}
          icon={<HiOutlinePuzzle />}
          name={"Activities"}
          id={"activities"}
        />
        <NavButton
          to={"/discussions"}
          icon={<HiOutlineChat />}
          name={"Discussions"}
          id={"discussions"}
        />
        <NavButton
          to={"/mindstore"}
          icon={<AiOutlineDollarCircle />}
          name={"MindStore"}
          id={"mindstore"}
        />
        <button
          className={`${styles["btn"]} ${styles["logout"]}`}
          onClick={() => logout()}
        >
          <BiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}

function NavButton({ to, icon, name, id }) {
  return (
    <NavLink
      to={to}
      id={id}
      className={styles["btn"]}
      style={({ isActive }) =>
        isActive
          ? {
              color: "#ffffff",
              background: "#9A9FDD",
            }
          : {
              color: "#202020",
              background: "none",
            }
      }
    >
      {icon}
      {name}
    </NavLink>
  );
}
