/* eslint-disable react/prop-types */
import styles from "./index.module.css";

const calcColourIndex = index => ((index % 5) + Math.floor(index / 6) * 6 + 2) % 6 || 2;

export default function MarketplaceList({ items = [] }) {
  return (
    <div className={styles["marketplace-list"]} role="marketplace-list">
      {items.map((item, i) => <Item  {...item} colorIndex={calcColourIndex(i)} key={item.name + i} /> )}
    </div>
  );
}

function Item({ name, price, colorIndex }) {
  return (
    <div className={`${styles["item"]} ${styles[`color-${colorIndex}`]}`}>
      <img src="https://www.johnstonehigh.co.uk/wp-content/uploads/2022/12/via.placeholder.png" alt="" draggable={false} />
      <div className={styles["content"]}>
        <h2>{name}</h2>
   
        <h4>{price.toLocaleString("en-US")} Dabloons</h4>
        <button className="btn">Buy</button>
      </div>
    </div>
  );
}

