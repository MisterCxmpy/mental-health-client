import { MarketplaceList, Tag } from "../../components"
import styles from "./index.module.css"
import {AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown} from "react-icons/ai"

export default function MindStore() {
  return (
    <div className="layout">
      <div className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1 className={styles["welcome-message"]}>Marketplace</h1>
          <p className={styles["message"]}>Mentor persona's and themes</p>
        </div>
      </div>
      <div className={styles["store-controls"]}>
        <div className={styles["controls"]}>
          <div className={styles["search"]}>
            <AiOutlineSearch />
            <form className={styles["search-form"]}>
              <div className={styles["input"]}>
                <input
                  className={styles["search-bar"]}
                  type="text"
                  placeholder="Search Store"
                  required
                />
              </div>
            </form>
          </div>
          <div className={styles["filter"]}>
            <button className={styles["filter-btn"]}><AiOutlineArrowUp /></button>
            <button className={styles["filter-btn"]}><AiOutlineArrowDown /></button>
          </div>
        </div>
        <div className={styles["tags"]}>
          <Tag tag={"CompSci"}/>
          <Tag tag={"Entrepreneur"}/>
          <Tag tag={"Joke"}/>
          <Tag tag={"Wise"}/>
        </div>
        <MarketplaceList />
      </div>
    </div>
  )
}
