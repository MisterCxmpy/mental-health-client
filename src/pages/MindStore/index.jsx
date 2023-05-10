import { useEffect, useState } from "react"
import { MarketplaceList, Tag } from "../../components"
import styles from "./index.module.css"
import { AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import { useAuth } from "../../contexts/authContext"
import { MindStoreIntroComponent } from "../../components"

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
  const [showIntro, setShowIntro] = useState(false);


  useEffect(() => {
    const introShown = localStorage.getItem('mindstoreIntroShown');
    if (introShown === 'true') {
      setShowIntro(true);
      localStorage.setItem('mindstoreIntroShown', 'false');
    }
  }, []); // Run once on component mount to show the intro

  const handleIntroExit = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    const getMarketplaceItems = async () => {
      let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.user_id }) }
      let response = await fetch('http://localhost:3000/mentor/store', options)
      let data = await response.json()

      if (response.ok) {
        setItems(data)
        setCategories(filterCategories(data))
      }
    }

    getMarketplaceItems()
  }, [])

  useEffect(() => {
    if (filter.query == "") {
      setFilter(prev => ({ ...prev, filter }))
      console.log('run');
    }

    if (activeCategory) {
      const categorySort = items.filter(item => {
        let name = item.name.toLowerCase();
        let query = filter.query.toLowerCase()

        const hit = name.includes(query) && activeCategory == item.category;

        return hit

      })

      setFilter(prev => ({ ...prev, items: [...categorySort] }))
    } else {
      const querySort = items.filter(item => { // sort mentors based on query
        let name = item.name.toLowerCase();
        let query = filter.query.toLowerCase()

        const hit = name.includes(query)
        return hit

      })

      setFilter(prev => ({ ...prev, items: [...querySort] }))
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
    let items = await buyMentor({ name, price })
    setItems(items)
  }


  return (
    <div className="layout">
      {showIntro && <MindStoreIntroComponent onExit={handleIntroExit} />}
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
