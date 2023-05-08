import { useEffect, useState } from "react"
import { MarketplaceList, Tag } from "../../components"
import styles from "./index.module.css"
import { AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import { useAuth } from "../../contexts/authContext"

function filterCategories(array) {
  let cats = array.map(i => i.category)
  return cats.filter(onlyUnique);
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}


export default function MindStore() {
  const { user, buyMentor } = useAuth();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({ query: "", items: [] });
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const getMarketplaceItems = async () => {
      let response = await fetch('http://localhost:3000/mentor/prices')
      let data = await response.json()

      if (response.ok) {
        let all = data.filter(i => {
          if (user?.owned_mentors?.findIndex(m => m.toLowerCase() !== i.name.toLowerCase()) < 0) {
            return i
          }
        })

        setItems(all)
        setCategories(filterCategories(data))
      }
    }

    getMarketplaceItems()
  }, [])

  useEffect(() => {
    if (filter.query == "") {
      setFilter(prev => {
        let all = items.filter(i => {
          if (user.owned_mentors.findIndex(m => m.toLowerCase() == i.name.toLowerCase()) < 0) {
            return i
          }
        })

        return { ...prev, res: all }
      })
    }

    if (activeCategory) {
      setFilter(prev => ({ // sort mentors based on category
        ...prev, items: items.filter(item => {
          let name = item.name.toLowerCase();
          let query = filter.query.toLowerCase()

          const hit = name.includes(query) && activeCategory == item.category;
          return hit

        })
      }))
    } else {
      setFilter(prev => ({ // sort mentors based on query
        ...prev, items: items.filter(item => {
          let name = item.name.toLowerCase();
          let query = filter.query.toLowerCase()

          const hit = name.includes(query)
          return hit

        })
      }))
    }

  }, [filter?.query, items, activeCategory, user?.owned_mentors])

  const handleSelectCategory = (cat) => {
    if (activeCategory == cat) {
      setActiveCategory(null)
    } else {
      setActiveCategory(cat)
    }
  }

  const handleBuyMentor = async ({ name, price }) => {
    await buyMentor({ name, price })
    let newMentors = filter.items.filter(i => {
      return i.name !== name
    });

    setFilter(prev => ({ ...prev, items: newMentors }))
  }


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
            <form className={styles["search-form"]} onSubmit={e => e.preventDefault()}>
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
          {categories.map(c => <Tag activeCategory={activeCategory} tag={c} key={c} select={() => handleSelectCategory(c)} />)}
        </div>

        <MarketplaceList handleBuyMentor={handleBuyMentor} items={filter.items} />
      </div>
    </div>
  )
}
