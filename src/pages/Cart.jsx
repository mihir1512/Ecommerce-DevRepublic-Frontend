import React, { useEffect, useState } from "react";
import axios from "axios";
import MuiContainer from "../components/Container";
import AddedItems from "../components/AddedItems";
import Button from "@mui/material/Button";
import styles from "./CSS.module.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [addedToCartProducts, setAddedToCartProducts] = useState([]);
  const [netAmount, setNetAmount] = useState(0);
  const navigate = useNavigate();

  const loadAddedCartProducts = async () => {
    const cartProducts = axios.get("http://localhost:5000/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return cartProducts;
  };

  useEffect(() => {
    loadAddedCartProducts().then((data) => setAddedToCartProducts(data));
  }, []);
  const { data } = addedToCartProducts;
  const finalPrice = data?.reduce((acc, curr) => {
    return acc + curr.totalProductPrice;
  }, 0);
  const handleBuy = async () => {
    await axios.post(
      "http://localhost:5000/purchase-history",
      {
        netAmount: netAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    navigate("/orderHistory");
};
  return (
    <>
      <MuiContainer>
        {data?.map((item, idx) => (
          <AddedItems
            key={idx}
            id={item.products.productId}
            name={item.productData.name}
            price={item.productData.price}
            category={item.productData.category}
            quantityInCart={item.products.quantity}
            setNetAmount={setNetAmount}
          />
        ))}
      </MuiContainer>
      {data?.length != 0 && (
        <div className={styles.container}>
          <div className={styles.total}>
            Total :{netAmount == 0 ? finalPrice : netAmount}$
          </div>
          <Button
            variant="contained"
            className={styles.buyBtn}
            onClick={handleBuy}
          >
            Buy Now
          </Button>{" "}
        </div>
      )}
    </>
  );
}

export default Cart;
