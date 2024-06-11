"use client";
import styles from "./sidebar.module.css";
import { MdDashboard } from "react-icons/md";
import { FaPeopleCarry, FaShippingFast } from "react-icons/fa";
import MenuLink from "./menuLink/menuLink";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Couriers",
        path: "/dashboard/couriers",
        icon: <FaPeopleCarry />,
      },
      {
        title: "Shipment",
        path: "/dashboard/shipment",
        icon: <FaShippingFast />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.company}>
        <img src="/logo.jpg" alt="" width="120" height="120" />
        <div className={styles.companyDetails}>
          <span className={styles.companyName}>Lorem Delivery</span>
          <span className={styles.companyTag}>dolor sit amet</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
