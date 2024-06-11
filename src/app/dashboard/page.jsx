import Card from "../ui/dashboard/card/card";
import Track from "../ui/dashboard/track/track";
import styles from "../ui/dashboard/dashboard.module.css";

const CourierPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Track />
      </div>
      <div className={styles.side}></div>
    </div>
  );
};

export default CourierPage;
