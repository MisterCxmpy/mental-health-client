import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

function filterCategories(array) {
  let cats = array.map(i => i.category)
  return cats.filter(onlyUnique);
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

export default function useMarketplaceCategories() {

  const [categories, setCategories] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const getMarketplaceItems = async () => {
      let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.user_id }) }

      let response = await fetch('http://localhost:3000/mentor/store', options)
      let data = await response.json()

      if (response.ok) {
        setCategories(filterCategories(data))
      }
    }

    getMarketplaceItems()
  }, [])

  return { categories }
}
