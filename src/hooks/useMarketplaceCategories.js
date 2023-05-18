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

  useEffect(() => {
    const getMarketplaceItems = async () => {
      let response = await fetch('https://mental-health-server-w9lq.onrender.com/mentor/categories')
      let data = await response.json()

      if (response.ok) {
        setCategories(data.filter(onlyUnique))
      }
    }

    getMarketplaceItems()
  }, [])

  return { categories }
}
