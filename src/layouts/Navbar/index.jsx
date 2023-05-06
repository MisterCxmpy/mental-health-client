/* eslint-disable react/prop-types */
import { NavLink, Outlet } from "react-router-dom";
import useQuote from "../../hooks/useQuote.js";
import { useAuth } from "../../contexts/authContext";
import styles from "./index.module.css";

import { BiHome, BiGlassesAlt, BiLogOut } from "react-icons/bi/";
import { HiOutlinePuzzle, HiOutlineChat, HiOutlineBookOpen } from "react-icons/hi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BsFillShieldFill } from "react-icons/bs"

export default function Navbar() {
  const { user } = useAuth();
  const { quote } = useQuote();

  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["profile"]}>

          <div className={styles["profile-options"]}>
            <div className={styles["profile-btn"]}>My profile</div>
            <div className={styles["profile-btn"]}><FiSettings /></div>
          </div>

          <div className={styles["profile-info"]}>
            <div className={styles["profile-picture"]}></div>
            <div className={styles["profile-name"]}>{user.username} <span className="admin-icon">{user.is_admin ? <BsFillShieldFill /> : null}</span></div>
            <div className={styles["progress"]}>40% Completed</div>
            <div className={styles["points"]}>{user.dabloons.toLocaleString("en-US")} Dabloons</div>
            <div className={styles["inspiration-message"]}>
              {quote.q}
            </div>
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
      <NavButton to={"/my-ai-mentor"} icon={<BiGlassesAlt />} name={"My AIMentor"} />
      <div className={styles["content"]}>
        <NavButton to={"/"} icon={<BiHome />} name={"Home"} />
        <NavButton to={"/activities"} icon={<HiOutlinePuzzle />} name={"Activities"} />
        <NavButton to={"/discussions"} icon={<HiOutlineChat />} name={"Discussions"} />
        <NavButton to={"/mindstore"} icon={<AiOutlineDollarCircle />} name={"MindStore"} />
        <button className={`${styles["btn"]} ${styles["logout"]}`} onClick={() => logout()} ><BiLogOut />Logout</button>
      </div>
    </div>
  )
}

function NavButton({ to, icon, name }) {
  return (
    <NavLink
      to={to}
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
