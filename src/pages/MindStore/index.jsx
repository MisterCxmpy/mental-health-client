import { useEffect, useState } from "react"
import { MarketplaceList, Tag } from "../../components"
import styles from "./index.module.css"
import { AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"

export default function MindStore() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({ query: "", items: [] });

  useEffect(() => {
    const getMarketplaceItems = async () => {
      let response = await fetch('http://localhost:3000/mentor/prices')
      let data = await response.json()

      if (response.ok) {
        setItems(data)
      }

      console.log(data);
    }

    getMarketplaceItems()
    
  }, [])

  useEffect(() => {
    if (filter.query == "") setFilter(prev => ({ ...prev, res: items }))
    setFilter(prev => ({
      ...prev, items: items.filter(item => {
        let name = item.name.toLowerCase();
        let query = filter.query.toLowerCase()

        return name.includes(query)
      })
    }))

  }, [filter?.query, items])


  return (
    <div className="layout">
      <div className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1 className={styles["welcome-message"]}>Marketplace</h1>
          <p className={styles["message"]}>Mentor persona&apos;s and themes</p>
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
                  onChange={(e) => setFilter(prev => ({ ...prev, query: e.target.value }))}
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
          <Tag tag={"CompSci"} />
          <Tag tag={"Entrepreneur"} />
          <Tag tag={"Joke"} />
          <Tag tag={"Wise"} />
        </div>

        <MarketplaceList items={filter.items} />
      </div>
    </div>
  )
}
