import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CSS.module.css";

function OrderHistory() {
  const [dataHistory, setDataHistory] = useState([]);
  const loadOrderHistory = async () => {
    try {
      const orderHistory = await axios.get(
        "http://localhost:5000/purchase-history",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return orderHistory.data;
    } catch (error) {
      console.error("Error loading order history:", error);
      return [];
    }
  };

  useEffect(() => {
    loadOrderHistory().then((data) => setDataHistory(data));
  }, []);

  return (
    <div>
      {dataHistory.map((item) => (
        <ul key={item._id} className={styles.Ul}>
          <li>Purchase Id: {item._id}</li>
          <li>Purchase Date: {new Date(item.purchaseDate).toLocaleString()}</li>
          <li>Net Amount: {item.netAmount}</li>
          <li>Payment: {item.payment ? "Completed" : "Pending"}</li>

          {item.products.map((itm, idx) => (
            <ul key={idx}>
              <li>Product Id: {itm.productId}</li>
              <li>Quantity: {itm.quantity}</li>
            </ul>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default OrderHistory;
