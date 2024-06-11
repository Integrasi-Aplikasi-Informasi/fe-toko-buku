import { MdPending } from "react-icons/md";
import styles from "./card.module.css";

const Card = () => {
  return (
    <div className={styles.container}>
      <MdPending size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Pending</span>
        <span className={styles.number}>15</span>
        <span className={styles.details}>
          <span className={styles.negative}>15</span> pesanan belum diproses
        </span>
      </div>
    </div>
  );
};

export default Card;
