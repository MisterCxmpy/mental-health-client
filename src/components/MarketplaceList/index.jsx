/* eslint-disable react/prop-types */
import styles from "./index.module.css";

const calcColourIndex = index => ((index % 5) + Math.floor(index / 6) * 6 + 2) % 6 || 2;

export default function MarketplaceList({ items = [], handleBuyMentor }) {
  return (
    <div className={styles["marketplace-list"]} role="marketplace-list">
      {items.map((item, i) => <Item  {...item} handleBuyMentor={handleBuyMentor} colorIndex={calcColourIndex(i)} key={item.name + i} id={`card-${i + 1}`}/>)}
    </div>
  );
}


function Item({ name, price, category, colorIndex, thumbnail, handleBuyMentor, id  }) {


  return (
    <div className={`${styles["item"]} ${styles[`color-${colorIndex}`]}`} role="item" id={id}>
      <img style={{ objectFit: 'cover' }} src={thumbnail ? thumbnail : "https://www.johnstonehigh.co.uk/wp-content/uploads/2022/12/via.placeholder.png"} alt="" draggable={false} />
      <div className={styles["content"]}>
        <h2>{name}</h2>
        <p className={styles.category}>{category}</p>
        <h4>{price.toLocaleString("en-US")} Dabloons</h4>
        <button className="btn" onClick={() => handleBuyMentor({ name, price })}>Buy</button>
      </div>
    </div>
  );
}

