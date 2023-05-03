import { NavLink, Outlet } from "react-router-dom";
import styles from "./index.module.css";
import { BiHome, BiGlassesAlt, BiLeaf } from "react-icons/bi/";
import {
  HiOutlinePuzzle,
  HiOutlineChat,
  HiOutlineBookOpen,
} from "react-icons/hi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

export default function Navbar() {
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
            <div className={styles["profile-name"]}>Bob</div>
            <div className={styles["progress"]}>40% Completed</div>
            <div className={styles["inspiration-message"]}>
              Keep smiling, because life is a beautiful thing and there's so
              much to smile about.
            </div>
          </div>
        </div>
        <div className={styles["navigation"]}>
          <NavButton to={"/"} icon={<BiHome />} name={"Home"} />
          <NavButton to={"/activities"} icon={<HiOutlinePuzzle />} name={"Activities"}/>
          <NavButton to={"/chatrooms"} icon={<HiOutlineChat />} name={"Chatrooms"} />
          <NavButton to={"/guides"} icon={<HiOutlineBookOpen />} name={"Guides"} />
          <NavButton to={"/my-ai-mentor"} icon={<BiGlassesAlt />} name={"My AIMentor"} />
          <NavButton to={"/meditations"} icon={<BiLeaf />} name={"Meditations"} />
          <NavButton to={"/mind-store"} icon={<AiOutlineDollarCircle />} name={"MindStore"} />
        </div>
      </nav>
      <Outlet />
    </>
  );
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
